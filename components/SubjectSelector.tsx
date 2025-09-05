
import React from 'react';
import { Subject } from '../types';
import { SUBJECTS } from '../constants';

interface SubjectSelectorProps {
  selectedSubject: Subject;
  onSubjectChange: (subject: Subject) => void;
}

const SubjectSelector: React.FC<SubjectSelectorProps> = ({ selectedSubject, onSubjectChange }) => {
  return (
    <div>
      <label htmlFor="subject-select" className="block text-sm font-medium text-slate-300 mb-2">
        Ders Seçimi
      </label>
      <select
        id="subject-select"
        value={selectedSubject}
        onChange={(e) => onSubjectChange(e.target.value as Subject)}
        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all duration-300"
      >
        {SUBJECTS.map((subject) => (
          <option key={subject} value={subject}>
            {subject}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SubjectSelector;
