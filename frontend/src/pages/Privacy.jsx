export default function Privacy() {
  const policies = [
    {
      title: "Information We Collect",
      desc: "We collect personal information such as your name, email, and usage data to improve our services and provide a better experience.",
    },
    {
      title: "How We Use Data",
      desc: "Your data is used to personalize your experience, process event registrations, and improve platform performance.",
    },
    {
      title: "Data Security",
      desc: "We implement strong security measures to protect your data from unauthorized access or misuse.",
    },
    {
      title: "Third-Party Services",
      desc: "We may use trusted third-party services for payments and analytics, which follow their own privacy policies.",
    },
    {
      title: "Cookies",
      desc: "We use cookies to enhance user experience, analyze traffic, and remember your preferences.",
    },
    {
      title: "Your Rights",
      desc: "You have the right to access, update, or delete your personal information at any time.",
    },
  ];

  return (
    <div className="px-6 md:px-16 py-16 space-y-20">

      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Privacy <span className="text-gradient">Policy</span>
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          We value your privacy and are committed to protecting your personal information.
        </p>
      </section>

      {/* Highlight Strip (different from Terms card) */}
      <section className="border-l-4 pl-6 py-4 bg-muted rounded-xl">
        <p className="text-lg font-medium">
          Your data is handled securely and transparently at every step.
        </p>
      </section>

      {/* Timeline Style Sections */}
      <section className="max-w-3xl mx-auto space-y-10">
        {policies.map((item, index) => (
          <div
            key={index}
            className="relative pl-8 border-l group"
          >
            {/* Dot */}
            <div className="absolute left-[-6px] top-2 w-3 h-3 rounded-full bg-primary"></div>

            <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition">
              {item.title}
            </h3>

            <p className="text-muted-foreground leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <section className="text-center">
        <p className="text-sm text-muted-foreground">
          Last updated: March 2026
        </p>
      </section>

    </div>
  );
}