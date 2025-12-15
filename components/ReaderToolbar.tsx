import { 
  Type, 
  AlignLeft, 
  Columns, 
  Sun, 
  Moon, 
  BookOpen,
  Hash,
  Minus,
  Plus,
  RotateCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ReadingPreferences } from '@/types';
import { cn } from '@/lib/utils';

interface ReaderToolbarProps {
  preferences: ReadingPreferences;
  onUpdatePreference: <K extends keyof ReadingPreferences>(
    key: K,
    value: ReadingPreferences[K]
  ) => void;
  onReset: () => void;
}

export const ReaderToolbar = ({ 
  preferences, 
  onUpdatePreference,
  onReset 
}: ReaderToolbarProps) => {
  const themes: { id: ReadingPreferences['theme']; label: string; icon: typeof Sun }[] = [
    { id: 'light', label: 'Claro', icon: Sun },
    { id: 'sepia', label: 'Sepia', icon: BookOpen },
    { id: 'dark', label: 'Oscuro', icon: Moon },
  ];

  const widths: { id: ReadingPreferences['columnWidth']; label: string }[] = [
    { id: 'narrow', label: 'Estrecho' },
    { id: 'medium', label: 'Medio' },
    { id: 'wide', label: 'Ancho' },
  ];

  return (
    <div className="flex items-center gap-1 p-2 bg-card border border-border rounded-lg shadow-sm">
      {/* Font Size */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-2" title="Tamaño de texto">
            <Type className="h-4 w-4" />
            <span className="text-xs hidden sm:inline">{preferences.fontSize}px</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64" align="start">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Tamaño de texto</Label>
              <span className="text-sm text-muted-foreground">{preferences.fontSize}px</span>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => onUpdatePreference('fontSize', Math.max(14, preferences.fontSize - 1))}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <Slider
                value={[preferences.fontSize]}
                onValueChange={([value]) => onUpdatePreference('fontSize', value)}
                min={14}
                max={28}
                step={1}
                className="flex-1"
              />
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => onUpdatePreference('fontSize', Math.min(28, preferences.fontSize + 1))}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Line Height */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" title="Interlineado">
            <AlignLeft className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64" align="start">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Interlineado</Label>
              <span className="text-sm text-muted-foreground">{preferences.lineHeight.toFixed(1)}</span>
            </div>
            <Slider
              value={[preferences.lineHeight]}
              onValueChange={([value]) => onUpdatePreference('lineHeight', value)}
              min={1.4}
              max={2.4}
              step={0.1}
            />
          </div>
        </PopoverContent>
      </Popover>

      {/* Column Width */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" title="Ancho de columna">
            <Columns className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48" align="start">
          <div className="space-y-2">
            <Label>Ancho de columna</Label>
            <div className="flex gap-1">
              {widths.map((width) => (
                <Button
                  key={width.id}
                  variant={preferences.columnWidth === width.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => onUpdatePreference('columnWidth', width.id)}
                  className="flex-1 text-xs"
                >
                  {width.label}
                </Button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <div className="w-px h-6 bg-border mx-1" />

      {/* Theme */}
      <div className="flex gap-0.5">
        {themes.map((theme) => {
          const Icon = theme.icon;
          return (
            <Button
              key={theme.id}
              variant={preferences.theme === theme.id ? "default" : "ghost"}
              size="sm"
              onClick={() => onUpdatePreference('theme', theme.id)}
              title={theme.label}
              className="px-2"
            >
              <Icon className="h-4 w-4" />
            </Button>
          );
        })}
      </div>

      <div className="w-px h-6 bg-border mx-1" />

      {/* Show Numbers */}
      <div className="flex items-center gap-2 px-2">
        <Switch
          id="show-numbers"
          checked={preferences.showNumbers}
          onCheckedChange={(checked) => onUpdatePreference('showNumbers', checked)}
        />
        <Label htmlFor="show-numbers" className="text-xs cursor-pointer">
          <Hash className="h-4 w-4" />
        </Label>
      </div>

      {/* Reset */}
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onReset} 
        title="Restablecer"
        className="ml-auto"
      >
        <RotateCcw className="h-4 w-4" />
      </Button>
    </div>
  );
};
