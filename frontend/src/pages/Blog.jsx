export default function Blog() {
  const posts = [
    {
      title: "Top Event Trends in 2026",
      desc: "Discover the latest trends shaping the event industry this year.",
      date: "March 10, 2026",
    },
    {
      title: "How to Organize a Successful Event",
      desc: "Step-by-step guide to planning and executing memorable events.",
      date: "February 25, 2026",
    },
    {
      title: "Virtual vs Physical Events",
      desc: "Explore the pros and cons of virtual and in-person events.",
      date: "February 15, 2026",
    },
  ];

  return (
    <div className="px-6 md:px-16 py-16 space-y-20 max-w-6xl mx-auto">
      
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Blog <span className="text-gradient">Insights</span>
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Read the latest news, tips, and trends from the world of events.
        </p>
      </section>

      {/* Featured Section */}
      <section className="bg-muted rounded-2xl p-8 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
        <h2 className="text-xl font-semibold mb-2">
          Featured: Top Event Trends in 2026
        </h2>
        <p className="text-muted-foreground mb-4">
          Stay ahead with the biggest innovations and ideas transforming events.
        </p>

        {/* Button (Theme based) */}
        <button className="px-6 py-2 font-bold rounded-lg border transition-all duration-300
          hover:scale-105 hover:shadow-lg hover:border-primary">
          Read More →
        </button>
      </section>

      {/* Blog Posts */}
      <section>
        <h2 className="text-2xl font-semibold text-center mb-12">
          Latest Articles
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <div
              key={index}
              className="group p-6 border rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-primary"
            >
              <p className="text-sm text-muted-foreground mb-2">
                {post.date}
              </p>

              <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition">
                {post.title}
              </h3>

              <p className="text-sm text-muted-foreground mb-4">
                {post.desc}
              </p>

              {/* Button */}
              <button className="px-5 py-2 font-semibold rounded-lg border transition-all duration-300
                hover:scale-105 hover:shadow-md hover:border-primary">
                Read More →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center bg-muted rounded-2xl p-10">
        <h2 className="text-2xl font-semibold mb-3">
          Want more insights?
        </h2>
        <p className="text-muted-foreground mb-6">
          Subscribe to our blog and never miss an update.
        </p>

        <button className="px-6 py-2 font-bold rounded-lg border transition-all duration-300
          hover:scale-105 hover:shadow-lg hover:border-primary">
          Subscribe →
        </button>
      </section>

    </div>
  );
}