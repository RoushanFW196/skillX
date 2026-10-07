import { Link } from "react-router";
import { ArrowRight, Code2, Guitar, Palette, Users } from "lucide-react";

const CommunityPage = () => {
  return (
    <div className="discover-page account-page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">
            <span /> GROW TOGETHER
          </div>
          <h1>Different skills. Shared curiosity.</h1>
          <p>Meet people who see the world a little differently.</p>
        </div>
      </div>
      <section className="community-feature">
        <img
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85"
          alt="People collaborating around a table"
        />
        <div>
          <Users size={22} />
          <h2>
            Knowledge is better
            <br />
            when it's shared.
          </h2>
          <p>
            Find your next collaborator, creative sounding board, or learning
            partner.
          </p>
          <Link className="dark-action" to="/app/explore-skills">
            Meet the community <ArrowRight size={16} />
          </Link>
        </div>
      </section>
      <div className="section-title">
        <div>
          <h2>Follow your interests</h2>
          <p>A shared interest is a great place to start.</p>
        </div>
      </div>
      <div className="community-topics">
        {[
          {
            title: "Makers & developers",
            icon: Code2,
            text: "Build ideas, solve problems, and learn from each other.",
            color: "#e7f1f5",
          },
          {
            title: "Design & creativity",
            icon: Palette,
            text: "Fresh perspectives for your next creative chapter.",
            color: "#f5e9ee",
          },
          {
            title: "Music & expression",
            icon: Guitar,
            text: "Find your rhythm with someone who loves to play.",
            color: "#f6f0dd",
          },
        ].map((topic) => (
          <Link
            to="/app/explore-skills"
            className="community-topic"
            key={topic.title}
          >
            <span style={{ background: topic.color }}>
              <topic.icon size={25} />
            </span>
            <h3>{topic.title}</h3>
            <p>{topic.text}</p>
            <span className="text-link">
              Explore mentors <ArrowRight size={14} />
            </span>
          </Link>
        ))}
      </div>
      <section className="exchange-bottom">
        <div className="bottom-icon">
          <Users size={23} />
        </div>
        <div>
          <h3>Your story belongs here.</h3>
          <p>Show the community what you're excited to share and learn.</p>
        </div>
        <Link to="/app/profile">
          Complete your profile <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
};

export default CommunityPage;
