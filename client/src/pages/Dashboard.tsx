import { useAtomValue } from "jotai";
import { Link } from "react-router";
import {
  ArrowRight,
  BookOpen,
  Check,
  Coins,
  GraduationCap,
  MessageCircle,
  Plus,
  Sparkles,
  Star,
  UserRound,
} from "lucide-react";
import { userInfoAtom } from "../store/atom";

export default function Dashboard() {
  const user = useAtomValue(userInfoAtom);
  const steps = [
    { label: "Introduce yourself", complete: Boolean(user?.name && user?.bio) },
    { label: "Add a profile photo", complete: Boolean(user?.profilePic) },
    {
      label: "Share a skill you can teach",
      complete: Boolean(user?.skillsOffered?.length),
    },
    {
      label: "Choose what you want to learn",
      complete: Boolean(user?.skillsToLearn?.length),
    },
  ];
  const progress = steps.filter((step) => step.complete).length * 25;
  return (
    <div className="discover-page account-page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">
            <span /> YOUR NEXT CHAPTER
          </div>
          <h1>
            Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}.
          </h1>
          <p>A little progress, every day. Make room for something new.</p>
        </div>
        <Link className="outline-action" to="/app/profile">
          <UserRound size={16} /> Edit profile
        </Link>
      </div>
      <div className="account-stats">
        <div>
          <span>
            <Coins size={18} /> Skill credits
          </span>
          <strong>
            {user?.credits ?? 0}
            <small>available</small>
          </strong>
          <p>Earn by sharing what you know.</p>
        </div>
        <div>
          <span>
            <BookOpen size={18} /> Skills to share
          </span>
          <strong>
            {user?.skillsOffered?.length ?? 0}
            <small>skills</small>
          </strong>
          <p>Your knowledge can open doors.</p>
        </div>
        <div>
          <span>
            <Star size={18} /> Community rating
          </span>
          <strong>
            {user?.ratingAvg ? user.ratingAvg.toFixed(1) : "Not rated"}
            <small>{user?.ratingCount ?? 0} reviews</small>
          </strong>
          <p>Trust grows with every exchange.</p>
        </div>
      </div>
      <div className="overview-columns">
        <section className="overview-section">
          <div className="section-title">
            <div>
              <h2>A profile that feels like you</h2>
              <p>Let your next learning partner get to know you.</p>
            </div>
            <span className="progress-number">{progress}%</span>
          </div>
          <progress
            className="profile-progress"
            value={progress}
            max={100}
            aria-label="Profile completeness"
          />
          <div className="profile-checklist">
            {steps.map((step) => (
              <Link to="/app/profile" key={step.label}>
                <span className={step.complete ? "step-done" : "step-pending"}>
                  {step.complete ? <Check size={13} /> : <Plus size={13} />}
                </span>
                {step.label}
                <ArrowRight size={14} />
              </Link>
            ))}
          </div>
        </section>
        <section className="overview-section credit-explanation">
          <Coins size={25} />
          <h2>Good knowledge comes around.</h2>
          <p>
            Earn credits when you teach. Use them to learn something from
            someone else.
          </p>
          <Link className="dark-action" to="/app/profile">
            Add a skill to teach <Plus size={15} />
          </Link>
          <span className="service-note">
            Credit purchases aren't available yet.
          </span>
        </section>
      </div>
      <div className="overview-columns">
        <section className="overview-section">
          <div className="section-title">
            <h2>What you can teach</h2>
            <Link className="text-link" to="/app/profile">
              Manage <ArrowRight size={14} />
            </Link>
          </div>
          {user?.skillsOffered?.length ? (
            <div className="personal-skills">
              {user.skillsOffered.map((skill) => (
                <Link to={`/app/skills/${skill._id}`} key={skill._id}>
                  <BookOpen size={18} />
                  {skill.name}
                  <ArrowRight size={15} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="account-empty">
              <BookOpen size={27} />
              <h3>Your experience is worth sharing.</h3>
              <p>Add your first teaching skill to your profile.</p>
              <Link className="text-link" to="/app/profile">
                Share a skill <Plus size={14} />
              </Link>
            </div>
          )}
        </section>
        <section className="overview-section">
          <div className="section-title">
            <h2>What you're curious about</h2>
            <Link className="text-link" to="/app/profile">
              Manage <ArrowRight size={14} />
            </Link>
          </div>
          {user?.skillsToLearn?.length ? (
            <div className="personal-skills">
              {user.skillsToLearn.map((skill) => (
                <Link to={`/app/skills/${skill._id}`} key={skill._id}>
                  <GraduationCap size={18} />
                  {skill.name}
                  <ArrowRight size={15} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="account-empty">
              <Sparkles size={27} />
              <h3>Follow your curiosity.</h3>
              <p>Choose a skill you'd love to learn next.</p>
              <Link className="text-link" to="/app/explore-skills">
                Explore skills <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </section>
      </div>
      <section className="exchange-bottom">
        <div className="bottom-icon">
          <MessageCircle size={23} />
        </div>
        <div>
          <h3>The best exchanges start with a conversation.</h3>
          <p>Connect with a learning partner and make a plan together.</p>
        </div>
        <Link to="/app/chat">
          Open messages <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}
