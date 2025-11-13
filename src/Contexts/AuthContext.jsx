import {
  createUserWithEmailAndPassword,
  updateProfile as firebaseUpdateProfile,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { auth } from "../lib/firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (error) {
      throw error;
    }
  };

  const register = async (name, email, password, photoURL) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update profile with name and photo
      await firebaseUpdateProfile(result.user, {
        displayName: name,
        photoURL: photoURL || null,
      });

      return result.user;
    } catch (error) {
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      return result.user;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  };

  const getIdToken = async () => {
    if (currentUser) {
      return await currentUser.getIdToken();
    }
    return null;
  };

  const updateProfile = async (profileData) => {
    if (!currentUser) return;

    setIsUpdatingProfile(true);
    try {
      // Update Firebase Auth profile
      await firebaseUpdateProfile(currentUser, {
        displayName: profileData.displayName,
        photoURL: profileData.photoURL,
      });

      // Manually update the local currentUser state
      // because Firebase doesn't always trigger onAuthStateChanged for this
      setCurrentUser((prevUser) => ({
        ...prevUser,
        displayName: profileData.displayName,
        photoURL: profileData.photoURL,
      }));

      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to update profile");
      throw error;
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const value = {
    currentUser,
    login,
    register,
    loginWithGoogle,
    logout,
    getIdToken,
    loading,
    updateProfile,
    isUpdatingProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
