"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    address: "",
    service: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Enquiry Sent Successfully!");
    setFormData({
      name: "",
      email: "",
      phone: "",
      country: "",
      address: "",
      service: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#f4efe6]">

      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full h-[320px] md:h-[400px] flex items-center justify-center text-center overflow-hidden">

        <img
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
          alt="Contact Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-[#0f1f3d]/85"></div>

        <div className="relative z-10 px-6 text-white">
          <p className="text-yellow-400 text-sm tracking-widest mb-3">
            HOME / CONTACT
          </p>

          <h1 className="text-4xl md:text-6xl font-bold">
            Contact <span className="text-yellow-400">Us</span>
          </h1>

          <p className="mt-4 text-gray-200 max-w-2xl mx-auto text-sm md:text-base">
            We are here to assist you with Tours & Forex services.
            Let’s plan your next journey together.
          </p>

          <div className="mt-6">
            <a
              href="tel:+919876543210"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg transition"
            >
              📞 Call Now
            </a>
          </div>
        </div>
      </section>

      {/* ================= MAIN SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-14">

        {/* LEFT SIDE */}
        <div className="space-y-10">

          <div className="flex items-start gap-4">
            <MapPin className="text-yellow-600 mt-1" />
            <div>
              <h4 className="font-semibold text-lg">Office Address</h4>
              <p className="text-gray-600">
                Kolkata, West Bengal, India
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Phone className="text-yellow-600 mt-1" />
            <div>
              <h4 className="font-semibold text-lg">Phone</h4>
              <p className="text-gray-600">+91 98765 43210</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Mail className="text-yellow-600 mt-1" />
            <div>
              <h4 className="font-semibold text-lg">Email</h4>
              <p className="text-gray-600">info@equatorialtours.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Clock className="text-yellow-600 mt-1" />
            <div>
              <h4 className="font-semibold text-lg">Working Hours</h4>
              <p className="text-gray-600">
                Mon – Sat: 9:00 AM – 6:00 PM
              </p>
            </div>
          </div>

          {/* MAP */}
          <div className="rounded-2xl overflow-hidden shadow-xl border-2 border-yellow-500">
            <iframe
              src="https://www.google.com/maps?q=Kolkata&output=embed"
              width="100%"
              height="300"
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="bg-white/95 backdrop-blur-md p-10 md:p-12 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-yellow-500/40 max-w-xl w-full mx-auto">

          <h3 className="text-3xl font-bold text-center mb-10">
            Send Us an <span className="text-yellow-600">Enquiry</span>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-7">

            {/* Row 1 */}
            <div className="grid md:grid-cols-2 gap-6">
              <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} />
              <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
            </div>

            {/* Row 2 */}
            <div className="grid md:grid-cols-2 gap-6">
              <InputField label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
              <InputField label="Country" name="country" value={formData.country} onChange={handleChange} />
            </div>

            {/* Address Full Width */}
            <InputField label="Full Address" name="address" value={formData.address} onChange={handleChange} />

            {/* Select */}
            <select
              name="service"
              required
              value={formData.service}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-4 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400 outline-none transition bg-white"
            >
              <option value="">Select Service</option>
              <option value="forex">Forex</option>
              <option value="tour">Tour & Travel</option>
              <option value="both">Both</option>
            </select>

            {/* Message */}
            <div className="relative">
              <textarea
                name="message"
                rows={4}
                required
                value={formData.message}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full border border-gray-300 rounded-xl px-4 pt-6 pb-3 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400 outline-none transition"
              />
              <label className="absolute left-4 top-2 text-gray-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
                Your Message
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:scale-[1.02] transition duration-300"
            >
              Send Enquiry
            </button>

          </form>
        </div>
      </section>
    </div>
  );
}

/* Reusable Floating Input Component */
function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  onChange: any;
  type?: string;
}) {
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        required
        value={value}
        onChange={onChange}
        placeholder=" "
        className="peer w-full border border-gray-300 rounded-xl px-4 pt-6 pb-3 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400 outline-none transition"
      />
      <label className="absolute left-4 top-2 text-gray-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
        {label}
      </label>
    </div>
  );
}