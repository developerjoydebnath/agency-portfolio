"use client";

import { ArrowIcon, MagneticButton } from "@/components/ui/MagneticButton";
import { motion } from "framer-motion";
import { useState } from "react";
import styles from "./Contact.module.css";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setFormData({ name: "", email: "", company: "", message: "" });
    alert("Message sent successfully!");
  };

  const isFieldActive = (field: string) => {
    return (
      focusedField === field || formData[field as keyof typeof formData] !== ""
    );
  };

  return (
    <section className={styles.contact} id="contact">
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.label}>Get In Touch</span>
          <h2 className={styles.title}>
            Let&apos;s create something <br />
            <span className={styles.titleItalic}>extraordinary</span>
          </h2>
          <p className={styles.subtitle}>
            Have a project in mind? We&apos;d love to hear about it. Send us a
            message and let&apos;s discuss how we can help.
          </p>
        </motion.div>

        {/* Content */}
        <div className={styles.content}>
          {/* Form */}
          <motion.form
            className={styles.form}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Name Field */}
            <div
              className={`${styles.formGroup} ${isFieldActive("name") ? styles.active : ""}`}
            >
              <label className={styles.formLabel} htmlFor="name">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                className={styles.formInput}
                required
                data-cursor="hover"
              />
              <div className={styles.formLine} />
            </div>

            {/* Email Field */}
            <div
              className={`${styles.formGroup} ${isFieldActive("email") ? styles.active : ""}`}
            >
              <label className={styles.formLabel} htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                className={styles.formInput}
                required
                data-cursor="hover"
              />
              <div className={styles.formLine} />
            </div>

            {/* Company Field */}
            <div
              className={`${styles.formGroup} ${isFieldActive("company") ? styles.active : ""}`}
            >
              <label className={styles.formLabel} htmlFor="company">
                Company (Optional)
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                onFocus={() => setFocusedField("company")}
                onBlur={() => setFocusedField(null)}
                className={styles.formInput}
                data-cursor="hover"
              />
              <div className={styles.formLine} />
            </div>

            {/* Message Field */}
            <div
              className={`${styles.formGroup} ${styles.formGroupMessage} ${isFieldActive("message") ? styles.active : ""}`}
            >
              <label className={styles.formLabel} htmlFor="message">
                Tell Us About Your Project
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                className={styles.formTextarea}
                rows={4}
                required
                data-cursor="hover"
              />
              <div className={styles.formLine} />
            </div>

            {/* Submit Button */}
            <div className={styles.formSubmit}>
              <MagneticButton variant="primary">
                {isSubmitting ? "Sending..." : "Send Message"} <ArrowIcon />
              </MagneticButton>
            </div>
          </motion.form>

          {/* Contact Info */}
          <motion.div
            className={styles.info}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Email</span>
              <a
                href="mailto:hello@stackrover.com"
                className={styles.infoValue}
                data-cursor="hover"
              >
                contact@stackrover.com
              </a>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Phone</span>
              <a
                href="tel:+8801722222222"
                className={styles.infoValue}
                data-cursor="hover"
              >
                +8801722222222
              </a>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Location</span>
              <span className={styles.infoValue}>Dhaka, Bangladesh</span>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Follow Us</span>
              <div className={styles.socialLinks}>
                <a href="#" className={styles.socialLink} data-cursor="hover">
                  Twitter
                </a>
                <a href="#" className={styles.socialLink} data-cursor="hover">
                  LinkedIn
                </a>
                <a href="#" className={styles.socialLink} data-cursor="hover">
                  Instagram
                </a>
                <a href="#" className={styles.socialLink} data-cursor="hover">
                  Dribbble
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
