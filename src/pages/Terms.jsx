// Terms.jsx

import Layout from "@/components/Layout";

const Terms = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-16 text-muted-foreground leading-7">
        <h1 className="text-3xl font-bold text-foreground mb-6">Terms of Service</h1>

        <p className="mb-4">
          These Terms of Service govern your use of GlowCut. By accessing or using our platform, 
          you agree to comply with these terms.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-6 mb-2">Use of Services</h2>
        <p className="mb-4">
          You agree to use our services only for lawful purposes. Any misuse, including fraudulent 
          bookings or unauthorized access, is strictly prohibited.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-6 mb-2">User Accounts</h2>
        <p className="mb-4">
          You are responsible for maintaining the confidentiality of your account credentials. 
          Any activity under your account will be considered your responsibility.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-6 mb-2">Bookings & Payments</h2>
        <p className="mb-4">
          All bookings made through our platform are subject to availability. 
          Payments, cancellations, and refunds will follow our defined policies.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-6 mb-2">Limitation of Liability</h2>
        <p className="mb-4">
          GlowCut is not liable for any indirect or incidental damages arising from the use of our services.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-6 mb-2">Termination</h2>
        <p className="mb-4">
          We reserve the right to suspend or terminate your access if you violate these terms.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-6 mb-2">Changes to Terms</h2>
        <p>
          We may update these Terms at any time. Continued use of our services means you accept the updated terms.
        </p>
      </div>
    </Layout>
  );
};

export default Terms;