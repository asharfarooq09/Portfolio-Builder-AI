
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  Timestamp,
  doc,
  deleteDoc,
  getDoc,
  updateDoc
} from "firebase/firestore";
import { db } from "./firebase";

export interface PortfolioFormData {
  name: string;
  skills: string;
  experience: string;
  education: string;
  projects: string;
  content: string;
}

export interface Portfolio {
  id: string;
  userId: string;
  content: string;
  formData: PortfolioFormData;
  createdAt: Timestamp;
}

export const savePortfolio = async (
  userId: string,
  content: string,
  formData: PortfolioFormData
) => {
  try {
    const docRef = await addDoc(collection(db, "portfolios"), {
      userId,
      content,
      formData,
      createdAt: Timestamp.now()
    });

    return docRef.id;
  } catch (error) {
    console.error("Error saving portfolio:", error);
    throw new Error("Failed to save portfolio");
  }
};

export const getUserPortfolios = async (userId: string): Promise<Portfolio[]> => {
  try {
    const portfoliosRef = collection(db, "portfolios");
    const q = query(portfoliosRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        userId: data.userId,
        content: data.content,
        formData: data.formData,
        createdAt: data.createdAt
      };
    });
  } catch (error) {
    console.error("Error getting portfolios:", error);
    throw new Error("Failed to fetch portfolios");
  }
};

export const getPortfolio = async (portfolioId: string): Promise<Portfolio | null> => {
  try {
    const docRef = doc(db, "portfolios", portfolioId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        userId: data.userId,
        content: data.content,
        formData: data.formData,
        createdAt: data.createdAt
      };
    }

    return null;
  } catch (error) {
    console.error("Error getting portfolio:", error);
    throw new Error("Failed to fetch portfolio");
  }
};

export const deletePortfolio = async (portfolioId: string) => {
  try {
    await deleteDoc(doc(db, "portfolios", portfolioId));
  } catch (error) {
    console.error("Error deleting portfolio:", error);
    throw new Error("Failed to delete portfolio");
  }
};

export const updatePortfolio = async (
  portfolioId: string,
  content: string,
  formData: PortfolioFormData
) => {
  try {
    const portfolioRef = doc(db, "portfolios", portfolioId);
    await updateDoc(portfolioRef, {
      content,
      formData,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error("Error updating portfolio:", error);
    throw new Error("Failed to update portfolio");
  }
};
