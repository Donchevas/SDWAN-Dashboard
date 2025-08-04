
import React, { useState } from 'react';
import type { LessonLearned as LessonType } from '../types';

interface LessonsLearnedProps {
  lessons: LessonType[];
  setLessons: React.Dispatch<React.SetStateAction<LessonType[]>>;
}

const LessonsLearned: React.FC<LessonsLearnedProps> = ({ lessons, setLessons }) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const handleEdit = (lesson: LessonType) => {
    setEditingId(lesson.id);
    setEditText(lesson.lesson);
  };

  const handleSave = (id: number) => {
    setLessons(prev => prev.map(l => l.id === id ? { ...l, lesson: editText } : l));
    setEditingId(null);
    setEditText('');
  };

  // Group lessons by site
  const lessonsBySite = lessons.reduce((acc, lesson) => {
    (acc[lesson.site] = acc[lesson.site] || []).push(lesson);
    return acc;
  }, {} as Record<string, LessonType[]>);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-corporate-blue-dark mb-1">Lecciones Aprendidas del Proyecto</h2>
        <p className="text-gray-600">Documentación de conocimientos clave adquiridos durante la migración para futuras referencias.</p>
      </div>

      <div className="space-y-8">
        {Object.entries(lessonsBySite).map(([siteName, siteLessons]) => (
          <div key={siteName} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-corporate-blue-dark border-b border-gray-200 pb-2 mb-4">
              Sede: {siteName}
            </h3>
            <ul className="space-y-4">
              {siteLessons.map((lesson) => (
                <li key={lesson.id} className="flex items-start space-x-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-corporate-blue-light flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="flex-1">
                    {editingId === lesson.id ? (
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-corporate-blue-light focus:border-corporate-blue-light"
                        rows={3}
                      />
                    ) : (
                      <p className="text-gray-700">{lesson.lesson}</p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    {editingId === lesson.id ? (
                      <button
                        onClick={() => handleSave(lesson.id)}
                        className="text-green-600 hover:text-green-800"
                        title="Guardar"
                      >
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(lesson)}
                        className="text-gray-400 hover:text-corporate-blue-dark"
                        title="Editar"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonsLearned;
