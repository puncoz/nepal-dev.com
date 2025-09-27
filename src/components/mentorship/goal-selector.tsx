import { Bot, Briefcase, Code, GraduationCap, TrendingUp } from "lucide-react"
import React from "react"

interface Goal {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  description?: string;
}

interface GoalSelectorProps {
  selectedGoals: string[];
  onGoalToggle: (goalId: string) => void;
  maxSelections?: number;
  showCustomOption?: boolean;
  onCustomGoal?: () => void;
  className?: string;
}

const defaultGoals: Goal[] = [
  {
    id: "devops",
    label: "DevOps",
    icon: <Code className="w-4 h-4"/>,
    color: "bg-blue-500",
    description: "Learn containerization, CI/CD, and cloud infrastructure",
  },
  {
    id: "react",
    label: "React",
    icon: <Code className="w-4 h-4"/>,
    color: "bg-cyan-500",
    description: "Master modern React development and ecosystem",
  },
  {
    id: "career",
    label: "Career Growth",
    icon: <TrendingUp className="w-4 h-4"/>,
    color: "bg-green-500",
    description: "Advance your career and leadership skills",
  },
  {
    id: "project",
    label: "Project Help",
    icon: <Briefcase className="w-4 h-4"/>,
    color: "bg-purple-500",
    description: "Get guidance on specific projects or challenges",
  },
  {
    id: "mobile",
    label: "Mobile Dev",
    icon: <Code className="w-4 h-4"/>,
    color: "bg-orange-500",
    description: "Build mobile apps with React Native or Flutter",
  },
  {
    id: "ai",
    label: "AI/ML",
    icon: <Bot className="w-4 h-4"/>,
    color: "bg-pink-500",
    description: "Explore artificial intelligence and machine learning",
  },
  {
    id: "backend",
    label: "Backend",
    icon: <Code className="w-4 h-4"/>,
    color: "bg-indigo-500",
    description: "Master server-side development and APIs",
  },
  {
    id: "certification",
    label: "Certification",
    icon: <GraduationCap className="w-4 h-4"/>,
    color: "bg-yellow-500",
    description: "Prepare for technical certifications and exams",
  },
]

const GoalSelector: React.FC<GoalSelectorProps> = ({
                                                     selectedGoals,
                                                     onGoalToggle,
                                                     maxSelections = 5,
                                                     showCustomOption = true,
                                                     onCustomGoal,
                                                     className = "",
                                                   }) => {
  const handleGoalClick = (goalId: string) => {
    const isSelected = selectedGoals.includes(goalId)
    const canSelect = selectedGoals.length < maxSelections

    if (isSelected || canSelect) {
      onGoalToggle(goalId)
    }
  }

  const isMaxReached = selectedGoals.length >= maxSelections

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-purple-500"/>
          What would you like to focus on?
        </h3>
        <div className="text-sm text-gray-500">
          {selectedGoals.length}/{maxSelections} selected
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {defaultGoals.map((goal) => {
          const isSelected = selectedGoals.includes(goal.id)
          const isDisabled = !isSelected && isMaxReached

          return (
            <button
              key={goal.id}
              onClick={() => handleGoalClick(goal.id)}
              disabled={isDisabled}
              className={`group relative flex items-center space-x-2 px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                isSelected
                  ? `${goal.color} text-white border-transparent shadow-lg scale-105`
                  : isDisabled
                    ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                    : "bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:shadow-md hover:scale-102"
              }`}
              title={goal.description}
            >
              {goal.icon}
              <span className="font-medium">{goal.label}</span>

              {/* Selection indicator */}
              {isSelected && (
                <div
                  className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              )}

              {/* Tooltip */}
              <div
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                {goal.description}
                <div
                  className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
              </div>
            </button>
          )
        })}

        {showCustomOption && (
          <button
            onClick={onCustomGoal}
            disabled={isMaxReached}
            className={`flex items-center space-x-2 px-4 py-3 rounded-lg border-2 border-dashed transition-colors ${
              isMaxReached
                ? "border-gray-200 text-gray-400 cursor-not-allowed"
                : "border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-600"
            }`}
          >
            <span>+ Custom Goal</span>
          </button>
        )}
      </div>

      {/* Selected goals summary */}
      {selectedGoals.length > 0 && (
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="font-medium text-purple-800 mb-2">Selected Focus Areas:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedGoals.map((goalId) => {
              const goal = defaultGoals.find(g => g.id === goalId)
              if (!goal) return null

              return (
                <div key={goalId}
                     className="flex items-center space-x-1 bg-white px-3 py-1 rounded-full border border-purple-200">
                  {goal.icon}
                  <span className="text-sm font-medium text-purple-700">{goal.label}</span>
                  <button
                    onClick={() => onGoalToggle(goalId)}
                    className="ml-1 text-purple-500 hover:text-purple-700 transition-colors"
                  >
                    ×
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Help text */}
      <p className="text-sm text-gray-500">
        💡 Select up to {maxSelections} areas you&apos;d like to focus on. Our AI will find mentors who specialize in
        these areas.
      </p>
    </div>
  )
}

export default GoalSelector
