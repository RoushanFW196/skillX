import { Link } from "react-router";
import { ArrowRight, ArrowDownUp, BookOpen, Users } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="discover-page account-page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">
            <span /> KNOWLEDGE GOES BOTH WAYS
          </div>
          <h1>SkillX. Stay curious.</h1>
          <p>
            A community built around something everyone has: something to share.
          </p>
        </div>
      </div>
      <section className="about-statement">
        <h2>
          Your experience could be
          <br />
          someone else's beginning.
        </h2>
        <p>
          A developer who wants to play guitar. A musician who wants to build a
          website. A photographer ready to learn a new language. We all have
          something to teach, and something to learn.
        </p>
        <Link className="dark-action" to="/">
          Find your next skill <ArrowRight size={16} />
        </Link>
      </section>
      <div className="community-topics">
        {[
          {
            title: "Share what you know",
            icon: BookOpen,
            text: "A small piece of your experience can make a big difference.",
          },
          {
            title: "Make a fair exchange",
            icon: ArrowDownUp,
            text: "Give your time and knowledge. Make room for something new.",
          },
          {
            title: "Grow together",
            icon: Users,
            text: "Real people, new perspectives, and connections worth keeping.",
          },
        ].map((item) => (
          <div className="community-topic" key={item.title}>
            <span style={{ background: "#eaf1e4" }}>
              <item.icon size={24} />
            </span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;
