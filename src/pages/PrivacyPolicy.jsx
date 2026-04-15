// PrivacyPolicy.jsx

import Layout from "@/components/Layout";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-16 text-muted-foreground leading-7">
        <h1 className="text-3xl font-bold text-foreground mb-6">Privacy Policy</h1>

        <p className="mb-4">
          At GlowCut, we respect your privacy and are committed to protecting your personal data. 
          This Privacy Policy explains how we collect, use, and safeguard your information when you use our services.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-6 mb-2">Information We Collect</h2>
        <p className="mb-4">
          We may collect personal details such as your name, email address, phone number, and booking preferences. 
          Additionally, we may collect technical data like IP address, browser type, and usage patterns.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-6 mb-2">How We Use Your Information</h2>
        <p className="mb-4">
          Your data is used to provide and improve our services, process bookings, personalize your experience, 
          and communicate updates or promotional offers.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-6 mb-2">Data Sharing</h2>
        <p className="mb-4">
          We do not sell your personal information. However, we may share data with trusted service providers 
          to help operate our platform, such as payment processors or analytics services.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-6 mb-2">Data Security</h2>
        <p className="mb-4">
          We implement industry-standard security measures to protect your data from unauthorized access, 
          misuse, or disclosure.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-6 mb-2">Your Rights</h2>
        <p className="mb-4">
          You have the right to access, update, or delete your personal information. 
          You can contact us anytime for such requests.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-6 mb-2">Updates to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be posted on this page.
        </p>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;