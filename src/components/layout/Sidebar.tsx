'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Maximize2, Minimize2 } from 'lucide-react';
import Button from '../ui/Button';
import { SummaStructure, Part, Article, QuestionGroup } from '../../services/summaService';

interface SidebarProps {
  structure: SummaStructure;
  currentPath?: string;
  onNavigate: (path: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ structure, currentPath, onNavigate, isOpen, onToggle }: SidebarProps) => {
  const [expandedParts, setExpandedParts] = useState<Set<string>>(new Set());
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());
  const [isExpanded, setIsExpanded] = useState(false);

  const togglePart = (partId: string) => {
    const newExpanded = new Set(expandedParts);
    if (newExpanded.has(partId)) {
      newExpanded.delete(partId);
    } else {
      newExpanded.add(partId);
    }
    setExpandedParts(newExpanded);
  };

  const toggleGroup = (groupId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  const toggleQuestion = (questionId: string) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(questionId)) {
      newExpanded.delete(questionId);
    } else {
      newExpanded.add(questionId);
    }
    setExpandedQuestions(newExpanded);
  };

  const renderGroups = (groups: QuestionGroup[], partId: string) => {
    if (!expandedParts.has(partId)) return null;

    return (
      <div className="ml-4 space-y-1 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {groups.map((group) => (
          <div key={group.id} className="space-y-1">
            <button
              onClick={() => toggleGroup(group.id)}
              className="w-full text-left px-3 py-2 rounded-md text-sm transition-colors hover:bg-gray-100 text-gray-700"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{group.startQuestion}-{group.endQuestion}</span>
                  <span className="truncate">{group.title}</span>
                </div>
                <span className={`transform transition-transform ${expandedGroups.has(group.id) ? 'rotate-90' : ''}`}>
                  ▶
                </span>
              </div>
            </button>
            
            {/* Questions within group */}
            {expandedGroups.has(group.id) && (
              <div className="ml-4 space-y-1 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {group.questions.map((question) => (
                  <div key={question.id} className="space-y-1">
                    <button
                      onClick={() => toggleQuestion(`${partId}-${question.id}`)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        currentPath === `/obras/summa-theologica/${partId}/${question.id}`
                          ? 'bg-blue-100 text-blue-700 font-medium'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Q.{question.id}</span>
                          <span className="truncate">{question.title}</span>
                        </div>
                        <span className={`transform transition-transform ${expandedQuestions.has(`${partId}-${question.id}`) ? 'rotate-90' : ''}`}>
                          ▶
                        </span>
                      </div>
                    </button>
                    
                    {/* Articles */}
                    {expandedQuestions.has(`${partId}-${question.id}`) && (
                      <div className="ml-4 space-y-1 max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        {question.articles?.map((article: Article) => (
                          <button
                            key={article.id}
                            onClick={() => onNavigate(`/obras/summa-theologica/${partId}/${question.id}/${article.id}`)}
                            className={`w-full text-left px-3 py-1 rounded-md text-xs transition-colors ${
                              currentPath === `/obras/summa-theologica/${partId}/${question.id}/${article.id}`
                                ? 'bg-blue-50 text-blue-600 font-medium'
                                : 'hover:bg-gray-50 text-gray-600'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-400">Art.{article.id}</span>
                              <span className="truncate">{article.title}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`h-[calc(100vh-8rem)] bg-white border-r border-gray-200 transition-all duration-300 z-30 ${
      isOpen ? (isExpanded ? 'w-96' : 'w-80') : 'w-12'
    }`}>
      {/* Toggle Button */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200">
        {isOpen && (
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-gray-900">Índice</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          {isOpen && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1"
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="p-1"
          >
            {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Content */}
      {isOpen && (
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-8rem-4rem)]">
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-gray-900">{structure.title}</h2>
            <p className="text-sm text-gray-600">{structure.author}</p>
            <p className="text-sm text-gray-600">{structure.subtitle}</p>
          </div>

          <div className="space-y-2">
            {structure.structure?.parts?.map((part: Part) => (
              <div key={part.id} className="space-y-1">
                <button
                  onClick={() => togglePart(part.id)}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">Parte {part.id}</span>
                      <span className="text-sm text-gray-600">- {part.title}</span>
                    </div>
                    <span className={`transform transition-transform ${expandedParts.has(part.id) ? 'rotate-90' : ''}`}>
                      ▶
                    </span>
                  </div>
                  {part.description && (
                    <p className="text-xs text-gray-500 mt-1">{part.description}</p>
                  )}
                </button>
                                 {renderGroups(part.groups || [], part.id)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
