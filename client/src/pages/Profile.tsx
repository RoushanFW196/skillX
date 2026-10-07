import { useEffect, useState } from "react";
import { ActionIcon, Avatar, FileButton, Loader, Tooltip } from "@mantine/core";
import { Link } from "react-router";
import { useAtom } from "jotai";
import {
  ArrowRight,
  BookOpen,
  Camera,
  Check,
  Clock,
  Coins,
  GraduationCap,
  Mail,
  MessageSquare,
  Pencil,
  Plus,
  RefreshCw,
  Star,
  UserRound,
} from "lucide-react";
import { toast } from "react-toastify";
import { fetchUserInfo } from "../utils/commonfunction.js";
import { loginAtom, userInfoAtom, type UserProfile } from "../store/atom";
import EditProfileModal, { type EditProfileValues } from "./EditProfileModal";

export default function ProfilePage() {
  const [opened, setOpened] = useState(false);
  const [, setIsLoggedIn] = useAtom(loginAtom);
  const [, setUser] = useAtom(userInfoAtom);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [skillsList, setSkillsList] = useState<
    { value: string; label: string }[]
  >([]);
  const [skillsError, setSkillsError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    let active = true;
    const loadProfile = async () => {
      setLoading(true);
      setError("");
      setSkillsError(false);
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error("Sign in again to view your profile.");
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (!payload.id)
          throw new Error("Your session is invalid. Please sign in again.");
        setIsLoggedIn(true);
        const [data, options] = await Promise.all([
          fetchUserInfo(payload.id),
          fetch(`${import.meta.env.VITE_API_BASE_URL}/skills/all`)
            .then(async (response) => {
              if (!response.ok) throw new Error("Skill catalog unavailable");
              const result = await response.json();
              return (result.skills || []).map(
                (skill: { _id: string; name: string }) => ({
                  value: skill._id,
                  label: skill.name,
                }),
              );
            })
            .catch(() => {
              if (active) setSkillsError(true);
              return [];
            }),
        ]);
        if (!data)
          throw new Error("We couldn't load your profile. Please try again.");
        if (active) {
          setProfile(data);
          setUser(data);
          setSkillsList(options);
        }
      } catch (failure) {
        if (active)
          setError(
            failure instanceof Error
              ? failure.message
              : "Unable to load your profile.",
          );
      } finally {
        if (active) setLoading(false);
      }
    };
    void loadProfile();
    return () => {
      active = false;
    };
  }, [retry, setIsLoggedIn, setUser]);

  const updateProfile = (data: UserProfile) => {
    setProfile(data);
    setUser(data);
    localStorage.setItem("userInfo", JSON.stringify(data));
  };

  const handleSave = async (updatedData: EditProfileValues) => {
    if (!profile) return false;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/user/profile/${profile._id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(updatedData),
        },
      );
      const result = await response.json();
      if (!response.ok || !result.data)
        throw new Error(result.message || "Failed to update profile");
      updateProfile(result.data);
      toast.success("Profile updated successfully");
      return true;
    } catch (failure) {
      toast.error(
        failure instanceof Error ? failure.message : "Failed to update profile",
      );
      return false;
    }
  };

  const handleUpload = async (file: File | null) => {
    if (!file || !profile) return;
    if (
      !["image/png", "image/jpeg"].includes(file.type) ||
      file.size > 5 * 1024 * 1024
    ) {
      toast.error("Choose a JPG or PNG photo smaller than 5 MB.");
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("profilePic", file);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/user/profile/upload-pic/${profile._id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: formData,
        },
      );
      const result = await response.json();
      if (!response.ok || !result.data?.profilePic)
        throw new Error(result.message || "Photo upload failed");
      updateProfile({ ...profile, profilePic: result.data.profilePic });
      toast.success("Profile photo updated");
    } catch (failure) {
      toast.error(
        failure instanceof Error ? failure.message : "Photo upload failed",
      );
    } finally {
      setUploading(false);
    }
  };

  if (loading)
    return (
      <div className="profile-status" role="status">
        <Loader size="md" />
        <p>Loading your profile...</p>
      </div>
    );
  if (error || !profile)
    return (
      <div className="profile-status" role="alert">
        <UserRound size={32} />
        <h1>Your profile is unavailable</h1>
        <p>{error || "Please try again."}</p>
        <button
          className="dark-action"
          onClick={() => setRetry((value) => value + 1)}
        >
          <RefreshCw size={16} /> Try again
        </button>
        <Link className="text-link" to="/auth/login">
          Sign in again <ArrowRight size={16} />
        </Link>
      </div>
    );

  const steps = [
    {
      label: "Add a profile photo",
      complete: Boolean(profile.profilePic),
      photo: true,
    },
    {
      label: "Write a short introduction",
      complete: Boolean(profile.bio?.trim()),
      photo: false,
    },
    {
      label: "Choose a skill to teach",
      complete: Boolean(profile.skillsOffered?.length),
      photo: false,
    },
    {
      label: "Choose a skill to learn",
      complete: Boolean(profile.skillsToLearn?.length),
      photo: false,
    },
  ];
  const progress = steps.filter((step) => step.complete).length * 25;
  const initials = (profile.name || "Your profile")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
  const availableSkills = [
    ...new Map(
      [
        ...skillsList,
        ...(profile.skillsOffered || []).map((skill) => ({
          value: skill._id,
          label: skill.name,
        })),
        ...(profile.skillsToLearn || []).map((skill) => ({
          value: skill._id,
          label: skill.name,
        })),
      ].map((skill) => [skill.value, skill]),
    ).values(),
  ];

  return (
    <div className="discover-page profile-page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">
            <span /> YOUR LEARNING IDENTITY
          </div>
          <h1>My profile</h1>
          <p>The knowledge you share. The things you're curious about.</p>
        </div>
        <button
          className="profile-edit-button outline-action"
          onClick={() => setOpened(true)}
        >
          <Pencil size={17} />
          <span>Edit profile</span>
        </button>
      </div>
      <section className="profile-identity" aria-label="Profile details">
        <div className="profile-photo">
          <Avatar
            src={profile.profilePic || null}
            size={104}
            radius={16}
            alt={profile.name || "Profile photo"}
          >
            {initials}
          </Avatar>
          <FileButton onChange={handleUpload} accept="image/png,image/jpeg">
            {(props) => (
              <Tooltip label="Change profile photo">
                <ActionIcon
                  {...props}
                  className="profile-photo-button"
                  size={36}
                  variant="filled"
                  disabled={uploading}
                  aria-label="Change profile photo"
                >
                  {uploading ? (
                    <Loader size={17} color="white" />
                  ) : (
                    <Camera size={17} />
                  )}
                </ActionIcon>
              </Tooltip>
            )}
          </FileButton>
        </div>
        <div className="profile-name">
          <span className="profile-member-label">
            <UserRound size={15} /> SkillX member
          </span>
          <h2>{profile.name || "Your name"}</h2>
          <p>
            <Mail size={16} /> {profile.email || "No email added"}
          </p>
        </div>
        <div className="profile-experience">
          <Clock size={20} />
          <strong>{profile.yearsOfExperience ?? 0} years</strong>
          <span>of experience</span>
        </div>
      </section>
      <dl className="profile-stats">
        <div>
          <dt>
            <Coins size={18} /> Available credits
          </dt>
          <dd>{profile.credits ?? 0}</dd>
        </div>
        <div>
          <dt>
            <Star size={18} /> Community rating
          </dt>
          <dd>
            {profile.ratingAvg ? profile.ratingAvg.toFixed(1) : "Not rated"}
            <span>{profile.ratingCount ?? 0} reviews</span>
          </dd>
        </div>
        <div>
          <dt>
            <BookOpen size={18} /> Skills to teach
          </dt>
          <dd>{profile.skillsOffered?.length ?? 0}</dd>
        </div>
        <div>
          <dt>
            <GraduationCap size={18} /> Learning interests
          </dt>
          <dd>{profile.skillsToLearn?.length ?? 0}</dd>
        </div>
      </dl>
      <div className="profile-columns">
        <div className="profile-main-content">
          <section className="profile-section">
            <div className="section-title">
              <h2>A little about me</h2>
            </div>
            {profile.bio?.trim() ? (
              <p className="profile-bio">{profile.bio}</p>
            ) : (
              <div className="profile-empty">
                <p>No introduction yet.</p>
                <button className="text-link" onClick={() => setOpened(true)}>
                  Add an introduction <Pencil size={15} />
                </button>
              </div>
            )}
          </section>
          {[
            {
              title: "What I can teach",
              skills: profile.skillsOffered || [],
              icon: BookOpen,
              kind: "teaching",
              empty: "Your first teaching skill belongs here.",
              action: "Add teaching skills",
            },
            {
              title: "What I'd love to learn",
              skills: profile.skillsToLearn || [],
              icon: GraduationCap,
              kind: "learning",
              empty: "What would you like to explore next?",
              action: "Add learning interests",
            },
          ].map((section) => (
            <section
              className={`profile-section profile-${section.kind}`}
              key={section.kind}
            >
              <div className="section-title">
                <h2>
                  <section.icon size={21} /> {section.title}
                </h2>
                <Tooltip label={`Manage ${section.kind} skills`}>
                  <ActionIcon
                    variant="subtle"
                    size={36}
                    aria-label={`Manage ${section.kind} skills`}
                    onClick={() => setOpened(true)}
                  >
                    <Plus size={19} />
                  </ActionIcon>
                </Tooltip>
              </div>
              {section.skills.length ? (
                <ul className="profile-skill-list">
                  {section.skills.map((skill) => (
                    <li key={skill._id}>
                      <Link to={`/app/skills/${skill._id}`}>
                        <span className="profile-skill-icon">
                          <section.icon size={20} />
                        </span>
                        <span>{skill.name}</span>
                        <ArrowRight size={17} />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="profile-empty">
                  <p>{section.empty}</p>
                  <button className="text-link" onClick={() => setOpened(true)}>
                    <Plus size={16} /> {section.action}
                  </button>
                </div>
              )}
            </section>
          ))}
        </div>
        <aside className="profile-aside">
          <section className="profile-section">
            <div className="section-title">
              <h2>Profile completeness</h2>
              <span className="progress-number">{progress}%</span>
            </div>
            <progress
              className="profile-progress"
              value={progress}
              max={100}
              aria-label="Profile completeness"
            />
            <ul className="profile-completion-list">
              {steps.map((step) => (
                <li key={step.label}>
                  <span
                    className={step.complete ? "step-done" : "step-pending"}
                  >
                    {step.complete ? <Check size={14} /> : <Plus size={14} />}
                  </span>
                  {step.photo ? (
                    <FileButton
                      onChange={handleUpload}
                      accept="image/png,image/jpeg"
                    >
                      {(props) => (
                        <button {...props} disabled={uploading}>
                          {step.label}
                        </button>
                      )}
                    </FileButton>
                  ) : (
                    <button onClick={() => setOpened(true)}>
                      {step.label}
                    </button>
                  )}
                  {step.complete && <span className="sr-only">Complete</span>}
                </li>
              ))}
            </ul>
          </section>
          <section className="profile-section profile-next-step">
            <GraduationCap size={27} />
            <h2>Your next exchange</h2>
            <Link className="text-link" to="/app/matches">
              Find a learning partner <ArrowRight size={17} />
            </Link>
            <Link className="text-link" to="/app/chat">
              <MessageSquare size={17} /> Open messages
            </Link>
          </section>
        </aside>
      </div>
      <EditProfileModal
        opened={opened}
        onClose={() => setOpened(false)}
        profile={profile}
        skillsList={availableSkills}
        skillsError={skillsError}
        onSave={handleSave}
      />
    </div>
  );
}
