export default function Cookies() {
  const cookies = [
    {
      title: "What Are Cookies?",
      desc: "Cookies are small text files stored on your device to help websites remember information about your visit.",
    },
    {
      title: "How We Use Cookies",
      desc: "We use cookies to improve user experience, analyze site traffic, and personalize content.",
    },
    {
      title: "Types of Cookies",
      desc: "We use essential cookies for functionality, analytics cookies for insights, and preference cookies to remember your settings.",
    },
    {
      title: "Managing Cookies",
      desc: "You can control or disable cookies through your browser settings at any time.",
    },
    {
      title: "Third-Party Cookies",
      desc: "Some cookies may be set by third-party services such as analytics or payment providers.",
    },
  ];

  return (
    <div className="px-6 md:px-16 py-16 space-y-20">

      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Cookie <span className="text-gradient">Policy</span>
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Learn how we use cookies to enhance your browsing experience and improve our platform.
        </p>
      </section>

      {/* Info Card */}
      <section className="bg-muted rounded-2xl p-8 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 text-center">
        <p className="text-lg font-medium">
          “Cookies help us deliver a smoother, faster, and more personalized experience.”
        </p>
      </section>

      {/* Cookie Sections */}
      <section className="max-w-4xl mx-auto space-y-6">
        {cookies.map((item, index) => (
          <div
            key={index}
            className="p-6 border rounded-2xl transition-all duration-300 hover:shadow-lg hover:border-primary"
          >
            <h3 className="font-semibold text-lg mb-2">
              {item.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="text-center">
        <h2 className="text-xl font-semibold mb-3">
          Manage Your Preferences
        </h2>
        <p className="text-muted-foreground mb-5">
          You can update your cookie preferences anytime through your browser settings.
        </p>

        <button className="px-6 py-2 font-bold rounded-lg border transition-all duration-300
          bg-black text-white 
          hover:bg-white hover:text-black 
          hover:shadow-lg hover:scale-105">
          Manage Cookies →
        </button>
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