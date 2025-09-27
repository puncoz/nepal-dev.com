import React, { useState } from 'react';
import { X, Calendar, Clock, MessageSquare, Target, User, Send, AlertCircle } from 'lucide-react';

interface SessionRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentor: {
    id: number;
    name: string;
    title: string;
    avatar: string;
    availability: string;
    responseTime: string;
  };
  onSubmit: (requestData: SessionRequestData) => void;
}

interface SessionRequestData {
  mentorId: number;
  sessionType: string;
  preferredDate: string;
  preferredTime: string;
  duration: string;
  goals: string;
  specificTopics: string;
  experience: string;
  questions: string;
  urgency: string;
}

const SessionRequestModal: React.FC<SessionRequestModalProps> = ({
  isOpen,
  onClose,
  mentor,
  onSubmit
}) => {
  const [formData, setFormData] = useState<SessionRequestData>({
    mentorId: mentor.id,
    sessionType: 'video-call',
    preferredDate: '',
    preferredTime: '',
    duration: '60',
    goals: '',
    specificTopics: '',
    experience: 'beginner',
    questions: '',
    urgency: 'normal'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sessionTypes = [
    { id: 'video-call', label: 'Video Call', icon: '📹', description: 'Face-to-face mentoring session' },
    { id: 'code-review', label: 'Code Review', icon: '👀', description: 'Review and feedback on your code' },
    { id: 'pair-programming', label: 'Pair Programming', icon: '👥', description: 'Code together in real-time' },
    { id: 'career-advice', label: 'Career Advice', icon: '🎯', description: 'Discuss career growth and opportunities' },
    { id: 'project-guidance', label: 'Project Guidance', icon: '🚀', description: 'Get help with specific projects' }
  ];

  const durations = [
    { value: '30', label: '30 minutes' },
    { value: '60', label: '1 hour' },
    { value: '90', label: '1.5 hours' },
    { value: '120', label: '2 hours' }
  ];

  const experienceLevels = [
    { value: 'beginner', label: 'Beginner', description: 'Just starting out' },
    { value: 'intermediate', label: 'Intermediate', description: 'Some experience' },
    { value: 'advanced', label: 'Advanced', description: 'Experienced developer' }
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Low Priority', description: 'Flexible timing' },
    { value: 'normal', label: 'Normal', description: 'Within a week' },
    { value: 'high', label: 'High Priority', description: 'ASAP' }
  ];

  const handleInputChange = (field: keyof SessionRequestData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Please select a preferred date';
    }
    if (!formData.preferredTime) {
      newErrors.preferredTime = 'Please select a preferred time';
    }
    if (!formData.goals.trim()) {
      newErrors.goals = 'Please describe your learning goals';
    }
    if (!formData.specificTopics.trim()) {
      newErrors.specificTopics = 'Please specify topics you want to discuss';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error submitting session request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{mentor.avatar}</div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Request Session</h2>
              <p className="text-gray-600">{mentor.name} • {mentor.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Session Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <MessageSquare className="w-4 h-4 inline mr-2" />
              Session Type
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {sessionTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => handleInputChange('sessionType', type.id)}
                  className={`p-3 border-2 rounded-lg text-left transition-all ${
                    formData.sessionType === type.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <span>{type.icon}</span>
                    <span className="font-medium">{type.label}</span>
                  </div>
                  <p className="text-sm text-gray-500">{type.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Preferred Date
              </label>
              <input
                type="date"
                value={formData.preferredDate}
                onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.preferredDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.preferredDate && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.preferredDate}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-2" />
                Preferred Time
              </label>
              <input
                type="time"
                value={formData.preferredTime}
                onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.preferredTime ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.preferredTime && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.preferredTime}
                </p>
              )}
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration
            </label>
            <select
              value={formData.duration}
              onChange={(e) => handleInputChange('duration', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {durations.map((duration) => (
                <option key={duration.value} value={duration.value}>
                  {duration.label}
                </option>
              ))}
            </select>
          </div>

          {/* Experience Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <User className="w-4 h-4 inline mr-2" />
              Your Experience Level
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {experienceLevels.map((level) => (
                <button
                  key={level.value}
                  type="button"
                  onClick={() => handleInputChange('experience', level.value)}
                  className={`p-3 border-2 rounded-lg text-center transition-all ${
                    formData.experience === level.value
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium">{level.label}</div>
                  <div className="text-sm text-gray-500">{level.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Goals */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Target className="w-4 h-4 inline mr-2" />
              Learning Goals
            </label>
            <textarea
              value={formData.goals}
              onChange={(e) => handleInputChange('goals', e.target.value)}
              placeholder="What do you hope to achieve from this session?"
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none ${
                errors.goals ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.goals && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.goals}
              </p>
            )}
          </div>

          {/* Specific Topics */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Specific Topics
            </label>
            <textarea
              value={formData.specificTopics}
              onChange={(e) => handleInputChange('specificTopics', e.target.value)}
              placeholder="What specific topics or challenges would you like to discuss?"
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none ${
                errors.specificTopics ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.specificTopics && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.specificTopics}
              </p>
            )}
          </div>

          {/* Questions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Questions or Context
            </label>
            <textarea
              value={formData.questions}
              onChange={(e) => handleInputChange('questions', e.target.value)}
              placeholder="Any additional information that would help the mentor prepare?"
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Urgency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Priority Level
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {urgencyLevels.map((urgency) => (
                <button
                  key={urgency.value}
                  type="button"
                  onClick={() => handleInputChange('urgency', urgency.value)}
                  className={`p-3 border-2 rounded-lg text-center transition-all ${
                    formData.urgency === urgency.value
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium">{urgency.label}</div>
                  <div className="text-sm text-gray-500">{urgency.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Mentor Info */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">📋 Mentor Information</h4>
            <div className="text-sm text-blue-700 space-y-1">
              <p><strong>Availability:</strong> {mentor.availability}</p>
              <p><strong>Typical Response Time:</strong> {mentor.responseTime}</p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Sending...' : 'Send Request'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SessionRequestModal;