import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, MapPin, Building2 } from 'lucide-react';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import BeautyLogo from './BeautyLogo';
import { db } from '../utils/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';

const FormCard = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    parlour: '',
    city: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'mobile') {
      // Only allow numbers and limit to 10 digits
      const numericValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation for mobile number
    if (formData.mobile.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsSubmitting(true);

    try {
      const docRef = doc(db, "registrations", formData.mobile);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        toast.error("This mobile number is already registered.");
      } else {
        await setDoc(docRef, {
          name: formData.name,
          mobile: formData.mobile,
          parlour: formData.parlour,
          city: formData.city,
          timestamp: serverTimestamp()
        });

        console.log("Document written with ID: ", formData.mobile);

        // Reset form after successful submission
        setFormData({
          name: '',
          mobile: '',
          parlour: '',
          city: ''
        });

        toast.success("Registration successful!");
      }
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      className="w-full max-w-md mx-auto"
    >
      <div className="glass-panel rounded-3xl p-8 sm:p-10 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-pink/10 rounded-bl-full -z-10 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-gold/10 rounded-tr-full -z-10 blur-2xl"></div>

        <div className="text-center mb-10">
          <BeautyLogo className="w-20 h-20 mx-auto mb-4" />
          <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-pink to-brand-gold mb-2">
            Kumkum Beauty Expo
          </h1>
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            Welcome! Please fill your details.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <InputField
            label="Name"
            name="name"
            icon={User}
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
          />
          <InputField
            label="Mobile Number"
            name="mobile"
            type="tel"
            icon={Phone}
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Your 10-digit number"
            maxLength="10"
            pattern="[0-9]{10}"
            inputMode="numeric"
          />
          <InputField
            label="Parlour Name"
            name="parlour"
            icon={Building2}
            value={formData.parlour}
            onChange={handleChange}
            placeholder="E.g. ABC Beauty Parlour"
          />
          <InputField
            label="City"
            name="city"
            icon={MapPin}
            value={formData.city}
            onChange={handleChange}
            placeholder="Your city"
          />

          <div className="mt-8">
            <SubmitButton isSubmitting={isSubmitting} />
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default FormCard;
