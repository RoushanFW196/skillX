import { useAtomValue } from "jotai";
import { Link } from "react-router";
import { ArrowRight, ArrowDownUp, Compass, Sparkles } from "lucide-react";
import { userInfoAtom } from "../store/atom";

const MatchesPage = () => {
  const user = useAtomValue(userInfoAtom);
  return (
    <div className="discover-page account-page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">
            <span /> FIND YOUR PEOPLE
          </div>
          <h1>A little give. A little grow.</h1>
          <p>Find someone whose curiosity complements your knowledge.</p>
        </div>
        <Link className="outline-action" to="/app/profile">
          <Sparkles size={16} /> Update my skills
        </Link>
      </div>
      <section className="match-preferences">
        <div>
          <span>
            <ArrowDownUp size={17} /> I can teach
          </span>
          <div className="preference-tags">
            {user?.skillsOffered?.length ? (
              user.skillsOffered.map((skill) => (
                <span key={skill._id}>{skill.name}</span>
              ))
            ) : (
              <Link to="/app/profile">
                Add your teaching skills <ArrowRight size={13} />
              </Link>
            )}
          </div>
        </div>
        <div>
          <span>
            <Sparkles size={17} /> I want to learn
          </span>
          <div className="preference-tags">
            {user?.skillsToLearn?.length ? (
              user.skillsToLearn.map((skill) => (
                <Link to={`/app/skills/${skill._id}`} key={skill._id}>
                  {skill.name}
                </Link>
              ))
            ) : (
              <Link to="/app/profile">
                Choose your learning goals <ArrowRight size={13} />
              </Link>
            )}
          </div>
        </div>
      </section>
      <section className="matching-empty">
        <div className="matching-symbol">
          <Compass size={37} />
        </div>
        <h2>Your next connection is out there.</h2>
        <p>
          Explore mentors in the live community and start a conversation about
          exchanging skills.
        </p>
        <Link className="dark-action" to="/app/explore-skills">
          Find a learning partner <ArrowRight size={16} />
        </Link>
        <span className="service-note">
          Personalized recommendations aren't connected yet.
        </span>
      </section>
    </div>
  );
};

export default MatchesPage;
