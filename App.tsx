
import React, { useState, useCallback } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import Schedule from './pages/Schedule';
import Checklist from './pages/Checklist';
import Incidents from './pages/Incidents';
import LessonsLearned from './pages/LessonsLearned';
import { mockSites, mockChecklists, mockIncidents, mockLessons } from './data/mockData';
import type { Site, Checklist as ChecklistType, Incident, LessonLearned as LessonType } from './types';


const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [sites, setSites] = useState<Site[]>(mockSites);
  const [checklists, setChecklists] = useState<ChecklistType[]>(mockChecklists);
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [lessons, setLessons] = useState<LessonType[]>(mockLessons);

  const handleLogin = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <HashRouter>
      <MainLayout onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard sites={sites} />} />
          <Route path="/schedule" element={<Schedule sites={sites} setSites={setSites} />} />
          <Route path="/checklist" element={<Checklist sites={sites} checklists={checklists} setChecklists={setChecklists} />} />
          <Route path="/incidents" element={<Incidents incidents={incidents} setIncidents={setIncidents} sites={sites} />} />
          <Route path="/lessons" element={<LessonsLearned lessons={lessons} setLessons={setLessons} />} />
        </Routes>
      </MainLayout>
    </HashRouter>
  );
};

export default App;
