
import React from 'react';
import type { ProfileData } from '../types';
import FormInput from './FormInput';
import FormTextArea from './FormTextArea';

interface ProfileFormProps {
  profileData: ProfileData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ profileData, onInputChange }) => {
  return (
    <form className="space-y-6">
      <FormInput 
        label="GitHub Username"
        name="username"
        value={profileData.username}
        onChange={onInputChange}
        placeholder="e.g., octocat"
        required
      />
      <FormInput 
        label="Name / Nickname"
        name="name"
        value={profileData.name}
        onChange={onInputChange}
        placeholder="e.g., Alex Doe"
      />
      <FormTextArea 
        label="Bio / Tagline"
        name="bio"
        value={profileData.bio}
        onChange={onInputChange}
        placeholder="A one-sentence description about you"
        rows={2}
      />
      <FormInput 
        label="I'm currently working on..."
        name="workingOn"
        value={profileData.workingOn}
        onChange={onInputChange}
        placeholder="e.g., a new React Native app"
      />
      <FormInput 
        label="I'm currently learning..."
        name="learning"
        value={profileData.learning}
        onChange={onInputChange}
        placeholder="e.g., Rust and WebAssembly"
      />
      <FormInput 
        label="I'm looking to collaborate on..."
        name="collaborateOn"
        value={profileData.collaborateOn}
        onChange={onInputChange}
        placeholder="e.g., open source AI projects"
      />
      <FormTextArea
        label="Tech Stack"
        name="techStack"
        value={profileData.techStack}
        onChange={onInputChange}
        placeholder="e.g., JavaScript, React, Node.js, Python, Docker"
        rows={3}
        helpText="Separate technologies with a comma."
      />
       <FormInput 
        label="How to reach me"
        name="contact"
        value={profileData.contact}
        onChange={onInputChange}
        placeholder="e.g., myemail@example.com"
      />
       <FormInput 
        label="Hobbies & Interests"
        name="hobbies"
        value={profileData.hobbies}
        onChange={onInputChange}
        placeholder="e.g., hiking, photography, retro gaming"
      />
    </form>
  );
};

export default ProfileForm;
