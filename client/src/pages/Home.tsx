import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import { Modal } from "@mantine/core";
import {
  ArrowDownUp,
  ArrowRight,
  Bookmark,
  Check,
  ChevronDown,
  Clock3,
  Code2,
  Compass,
  Globe2,
  Guitar,
  LayoutGrid,
  List,
  Palette,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  Video,
  X,
  Zap,
} from "lucide-react";

const skills = [
  {
    id: "design",
    title: "UI/UX design, from the ground up",
    category: "Design",
    tag: "UI/UX Design",
    name: "Sarah Chen",
    role: "Product designer at Figma",
    rating: "4.9",
    reviews: 38,
    credits: 2,
    image: "photo-1558655146-9f40138edfeb",
    avatar: "photo-1534528741775-53994a69daeb",
    wants: "Web development",
    online: true,
    description:
      "Build your design foundations with hands-on exercises in Figma. Explore user research, wireframes, and thoughtful interfaces with personalized feedback.",
  },
  {
    id: "code",
    title: "Build your first website with React",
    category: "Development",
    tag: "Web Development",
    name: "Alex Morgan",
    role: "Full-stack developer",
    rating: "5.0",
    reviews: 24,
    credits: 3,
    image: "photo-1498050108023-c5249f4df085",
    avatar: "photo-1500648767791-00dcc994a43e",
    wants: "Photography",
    online: true,
    description:
      "Turn your idea into a working website. Learn components, state, and responsive layouts, then put everything together in a small React project.",
  },
  {
    id: "guitar",
    title: "Acoustic guitar for absolute beginners",
    category: "Music",
    tag: "Guitar",
    name: "Daniel Rivera",
    role: "Musician & guitar instructor",
    rating: "4.8",
    reviews: 56,
    credits: 2,
    image: "photo-1510915361894-db8b60106cb1",
    avatar: "photo-1506794778202-cad84cf45f1d",
    wants: "Spanish",
    online: false,
    description:
      "Get comfortable with your guitar, learn your first chords, and play a song you love. No experience required; just bring your instrument.",
  },
  {
    id: "photo",
    title: "See the world through a new lens",
    category: "Photography",
    tag: "Photography",
    name: "Emma Wilson",
    role: "Travel & lifestyle photographer",
    rating: "4.9",
    reviews: 31,
    credits: 2,
    image: "photo-1452780212940-6f5c0d14d848",
    avatar: "photo-1524504388940-b1c1722653e1",
    wants: "Graphic design",
    online: true,
    description:
      "Find better light, stronger compositions, and your own visual voice. Bring a camera or a phone and work through practical photography exercises.",
  },
  {
    id: "language",
    title: "Spanish that goes beyond hola",
    category: "Languages",
    tag: "Spanish",
    name: "Sofia Martinez",
    role: "Native speaker & language coach",
    rating: "4.9",
    reviews: 42,
    credits: 1,
    image: "photo-1543783207-ec64e4d95325",
    avatar: "photo-1544005313-94ddf0286df2",
    wants: "Digital marketing",
    online: false,
    description:
      "Practice everyday Spanish in a relaxed, conversational session. Improve pronunciation, build vocabulary, and feel more confident speaking.",
  },
  {
    id: "marketing",
    title: "Make your brand worth talking about",
    category: "Business",
    tag: "Digital Marketing",
    name: "James Park",
    role: "Growth strategist",
    rating: "4.8",
    reviews: 19,
    credits: 3,
    image: "photo-1460925895917-afdab827c52f",
    avatar: "photo-1517841905240-472988babdf9",
    wants: "Video editing",
    online: true,
    description:
      "Create a focused marketing plan for your project. Work on audience research, content strategy, and the metrics that actually matter.",
  },
];
const categories = [
  "All skills",
  "Design",
  "Development",
  "Music",
  "Languages",
  "Photography",
  "Business",
];
type Skill = (typeof skills)[number];
const photo = (id: string, width = 600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

export default function Home() {
  const [params, setParams] = useSearchParams();
  const view = params.get("view") || "explore";
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All skills");
  const [sort, setSort] = useState("recommended");
  const [list, setList] = useState(false);
  const [filters, setFilters] = useState(false);
  const [available, setAvailable] = useState(false);
  const [maxCredits, setMaxCredits] = useState(3);
  const [selected, setSelected] = useState<Skill | null>(null);
  const [saved, setSaved] = useState<string[]>(() => {
    try {
      const stored: unknown = JSON.parse(
        localStorage.getItem("skillx-saved-preview") || "[]",
      );
      return Array.isArray(stored)
        ? stored.filter((item): item is string => typeof item === "string")
        : [];
    } catch {
      return [];
    }
  });
  const toggleSaved = (id: string) => {
    const next = saved.includes(id)
      ? saved.filter((item) => item !== id)
      : [...saved, id];
    setSaved(next);
    localStorage.setItem("skillx-saved-preview", JSON.stringify(next));
  };
  const filtered = skills
    .filter(
      (skill) =>
        (category === "All skills" || skill.category === category) &&
        `${skill.title} ${skill.name} ${skill.tag}`
          .toLowerCase()
          .includes(query.toLowerCase()) &&
        (!available || skill.online) &&
        skill.credits <= maxCredits &&
        (view !== "saved" || saved.includes(skill.id)),
    )
    .sort((first, second) =>
      sort === "rating"
        ? Number(second.rating) - Number(first.rating)
        : sort === "credits"
          ? first.credits - second.credits
          : 0,
    );

  return (
    <div className="discover-page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">
            <span /> A LITTLE CURIOSITY GOES A LONG WAY
          </div>
          <h1>
            {view === "saved"
              ? "Your next chapter, bookmarked."
              : "What will you learn next?"}
          </h1>
          <p>
            {view === "saved"
              ? "Keep your favorite skills close. Come back when you're ready."
              : "Discover something new. Share what you know. Grow together."}
          </p>
        </div>
        <Link
          to="/app/profile"
          className="outline-action"
          aria-label="Share a skill"
        >
          <Zap size={16} /> <span>Share a skill</span>
        </Link>
      </div>
      {view !== "saved" && (
        <section className="discovery-banner">
          <div className="banner-copy">
            <span className="banner-label">
              <Sparkles size={14} /> BETTER TOGETHER
            </span>
            <h2>
              Your skills are someone
              <br />
              else's next big thing.
            </h2>
            <p>
              Trade what you know for what you want to learn.
              <br />
              Great things start with a simple exchange.
            </p>
            <button
              className="dark-action"
              onClick={() => {
                setCategory("All skills");
                document
                  .getElementById("skill-discovery")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              Find your next skill <ArrowRight size={16} />
            </button>
            <div className="banner-community">
              <div className="avatar-stack">
                {skills.slice(0, 4).map((skill) => (
                  <img key={skill.id} src={photo(skill.avatar, 80)} alt="" />
                ))}
              </div>
              <span>A world of knowledge. A community of possibility.</span>
            </div>
          </div>
          <div className="banner-art">
            <div className="art-grid" />
            <div className="exchange-tile tile-design">
              <span className="tile-icon">
                <Palette size={26} />
              </span>
              <strong>
                I'll teach you
                <br />
                design.
              </strong>
              <span>Make something meaningful.</span>
            </div>
            <div className="exchange-symbol">
              <ArrowDownUp size={24} />
            </div>
            <div className="exchange-tile tile-code">
              <span className="tile-icon">
                <Code2 size={27} />
              </span>
              <strong>
                You teach me
                <br />
                to code.
              </strong>
              <span>Bring an idea to life.</span>
            </div>
            <span className="art-note">
              <Sparkles size={15} /> A good match changes everything.
            </span>
          </div>
        </section>
      )}
      <section className="discovery-section" id="skill-discovery">
        <div className="section-title">
          <div>
            <h2>
              {view === "saved" ? "Saved skills" : "Find your spark"}{" "}
              <span className="small-label">Community preview</span>
            </h2>
            <p>Good people. Real skills. Endless possibilities.</p>
          </div>
          <Link to="/app/explore-skills" className="text-link">
            Explore live listings <ArrowRight size={15} />
          </Link>
        </div>
        <div className="discovery-controls">
          <label className="skill-search">
            <Search size={18} />
            <input
              aria-label="Search skills or mentors"
              placeholder="What do you want to learn?"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            {query && (
              <button aria-label="Clear search" onClick={() => setQuery("")}>
                <X size={16} />
              </button>
            )}
          </label>
          <button
            className={`filter-button ${filters ? "is-selected" : ""}`}
            onClick={() => setFilters(!filters)}
            aria-expanded={filters}
          >
            <SlidersHorizontal size={16} /> Filters{" "}
            {(available || maxCredits < 3) && <span className="filter-dot" />}
          </button>
          <label className="sort-control">
            <span>Sort by:</span>
            <select
              aria-label="Sort skills"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              <option value="recommended">Recommended</option>
              <option value="rating">Highest rated</option>
              <option value="credits">Lowest credits</option>
            </select>
            <ChevronDown size={14} />
          </label>
        </div>
        {filters && (
          <div className="filter-panel">
            <label>
              <input
                type="checkbox"
                checked={available}
                onChange={(event) => setAvailable(event.target.checked)}
              />{" "}
              Available this week
            </label>
            <label>
              Credits per session{" "}
              <select
                aria-label="Maximum credits"
                value={maxCredits}
                onChange={(event) => setMaxCredits(Number(event.target.value))}
              >
                <option value={1}>Up to 1 credit</option>
                <option value={2}>Up to 2 credits</option>
                <option value={3}>Any amount</option>
              </select>
            </label>
            <button
              className="text-link"
              onClick={() => {
                setAvailable(false);
                setMaxCredits(3);
              }}
            >
              Reset filters
            </button>
          </div>
        )}
        <div className="category-row">
          <div className="category-tabs">
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? "active" : ""}
                onClick={() => setCategory(item)}
              >
                {item === "All skills" && <Compass size={15} />}
                {item}
              </button>
            ))}
          </div>
          <div className="view-toggle">
            <button
              title="Grid view"
              aria-label="Grid view"
              aria-pressed={!list}
              className={!list ? "active" : ""}
              onClick={() => setList(false)}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              title="List view"
              aria-label="List view"
              aria-pressed={list}
              className={list ? "active" : ""}
              onClick={() => setList(true)}
            >
              <List size={18} />
            </button>
          </div>
        </div>
        <div className="results-caption">
          <span>{filtered.length} skills to explore</span>
          <span>
            <span className="status-dot" /> A little exchange. A lot of growth.
          </span>
        </div>
        <div className={`skill-grid ${list ? "list-view" : ""}`}>
          {filtered.map((skill) => (
            <article className="discovery-card" key={skill.id}>
              <div className="skill-cover">
                <img
                  src={photo(skill.image)}
                  alt={`${skill.tag} workspace`}
                  loading="lazy"
                />
                <span className="skill-category">{skill.tag}</span>
                <button
                  title={
                    saved.includes(skill.id)
                      ? "Remove saved skill"
                      : "Save skill"
                  }
                  aria-label={`${saved.includes(skill.id) ? "Unsave" : "Save"} ${skill.title}`}
                  aria-pressed={saved.includes(skill.id)}
                  className={`save-skill ${saved.includes(skill.id) ? "saved" : ""}`}
                  onClick={() => toggleSaved(skill.id)}
                >
                  <Bookmark
                    size={17}
                    fill={saved.includes(skill.id) ? "currentColor" : "none"}
                  />
                </button>
                {skill.online && (
                  <span className="available-badge">
                    <span className="status-dot" /> Available this week
                  </span>
                )}
              </div>
              <div className="skill-body">
                <div className="mentor-row">
                  <img
                    className="mentor-avatar"
                    src={photo(skill.avatar, 100)}
                    alt={skill.name}
                  />
                  <div>
                    <strong>
                      {skill.name}{" "}
                      <span className="verified-check">
                        <Check size={9} />
                      </span>
                    </strong>
                    <p>{skill.role}</p>
                  </div>
                  <span className="skill-rating">
                    <Star size={12} fill="currentColor" /> {skill.rating}{" "}
                    <small>({skill.reviews})</small>
                  </span>
                </div>
                <button
                  className="skill-title"
                  onClick={() => setSelected(skill)}
                >
                  {skill.title}
                </button>
                <div className="skill-meta">
                  <span>
                    <Video size={13} /> 1-on-1 session
                  </span>
                  <span>
                    <Clock3 size={13} /> 60 min
                  </span>
                </div>
                <div className="exchange-want">
                  <ArrowDownUp size={13} />
                  <span>Wants to learn</span>
                  <strong>{skill.wants}</strong>
                </div>
                <div className="skill-card-footer">
                  <span>
                    <Zap size={15} />
                    <strong>{skill.credits} credits</strong>
                    <small> / session</small>
                  </span>
                  <button onClick={() => setSelected(skill)}>
                    View skill <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="discovery-empty">
            <Bookmark size={28} />
            <h3>
              {view === "saved"
                ? "Your collection starts here"
                : "No skills match just yet"}
            </h3>
            <p>
              {view === "saved"
                ? "Save a skill that catches your eye to find it here."
                : "Try a different search or give your filters a little breathing room."}
            </p>
            <button
              className="dark-action"
              onClick={() => {
                setQuery("");
                setCategory("All skills");
                setAvailable(false);
                setMaxCredits(3);
                setParams({});
              }}
            >
              Explore all skills <ArrowRight size={16} />
            </button>
          </div>
        )}
      </section>
      <section className="exchange-bottom">
        <div className="bottom-icon">
          <Guitar size={24} />
        </div>
        <div>
          <h3>Everyone has something worth sharing.</h3>
          <p>That thing you do? Someone out there would love to learn it.</p>
        </div>
        <Link to="/app/profile">
          Share your skills <ArrowRight size={16} />
        </Link>
      </section>
      <footer className="workspace-footer">
        <span>Good things happen when knowledge is shared.</span>
        <span>
          SkillX <span>·</span> Made for curious minds <Globe2 size={13} />
        </span>
      </footer>
      <Modal
        opened={selected !== null}
        onClose={() => setSelected(null)}
        title="Community preview"
        size="lg"
        centered
      >
        {selected && (
          <div className="skill-detail">
            <img
              className="detail-cover"
              src={photo(selected.image)}
              alt={selected.tag}
            />
            <span className="detail-tag">{selected.tag}</span>
            <h2>{selected.title}</h2>
            <div className="detail-mentor">
              <img
                className="mentor-avatar"
                src={photo(selected.avatar, 100)}
                alt={selected.name}
              />
              <div>
                <strong>{selected.name}</strong>
                <p>{selected.role}</p>
              </div>
              <span>
                <Star size={14} /> {selected.rating}
              </span>
            </div>
            <p>{selected.description}</p>
            <div className="detail-facts">
              <span>
                <Video size={17} /> Online, one-on-one
              </span>
              <span>
                <Clock3 size={17} /> 60 minutes
              </span>
              <span>
                <Zap size={17} /> {selected.credits} credits
              </span>
            </div>
            <div className="preview-notice">
              This is a sample mentor, not a bookable listing. Explore the live
              community to find your next exchange.
            </div>
            <Link className="dark-action" to="/app/explore-skills">
              Find a live mentor <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </Modal>
    </div>
  );
}
