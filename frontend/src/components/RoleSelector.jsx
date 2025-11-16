import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { User, Users, Check } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const RoleSelector = ({ currentRole, onRoleChange }) => {
  const [selectedRole, setSelectedRole] = useState(currentRole);
  const [saving, setSaving] = useState(false);

  const roles = [
    {
      id: 'individual',
      title: 'Einzelnutzer',
      description: 'Für persönliches Lernen mit individuellen Übungen',
      icon: User,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      id: 'teacher',
      title: 'Lehrkraft',
      description: 'Mit zusätzlichen Gruppen- und Partnerübungen für den Unterricht',
      icon: Users,
      color: 'from-blue-500 to-purple-500'
    }
  ];

  const handleSave = async () => {
    if (selectedRole === currentRole) {
      toast.info('Keine Änderung');
      return;
    }

    setSaving(true);
    try {
      await axios.put(`${API}/profile/role`, 
        { role: selectedRole },
        { withCredentials: true }
      );
      
      toast.success('Rolle erfolgreich aktualisiert!');
      onRoleChange(selectedRole);
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error('Fehler beim Aktualisieren der Rolle');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card data-testid="role-selector-card" className="glass border-emerald-200">
      <CardHeader>
        <CardTitle className="text-2xl text-emerald-900">Nutzerrolle</CardTitle>
        <CardDescription>
          Wähle deine Rolle aus, um passende Übungen zu erhalten
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;
            
            return (
              <button
                key={role.id}
                data-testid={`role-option-${role.id}`}
                onClick={() => setSelectedRole(role.id)}
                className={`relative p-6 rounded-xl border-2 transition-all text-left ${
                  isSelected 
                    ? 'border-emerald-600 bg-emerald-50' 
                    : 'border-gray-200 hover:border-emerald-300 bg-white'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3">
                    <Check className="w-6 h-6 text-emerald-600" />
                  </div>
                )}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-emerald-900 mb-2">
                  {role.title}
                </h3>
                <p className="text-sm text-emerald-700">
                  {role.description}
                </p>
              </button>
            );
          })}
        </div>
        
        {selectedRole !== currentRole && (
          <Button 
            data-testid="save-role-btn"
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 text-lg rounded-xl"
          >
            {saving ? 'Speichere...' : 'Rolle speichern'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default RoleSelector;