import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { WorkNode } from '@/types';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WorkIndexProps {
  workSlug: string;
  index: WorkNode;
  currentPath?: string[];
  onSelect?: (node: WorkNode) => void;
}

interface IndexNodeProps {
  workSlug: string;
  node: WorkNode;
  depth: number;
  currentPath?: string[];
  expandedNodes: Set<string>;
  toggleNode: (id: string) => void;
  onSelect?: (node: WorkNode) => void;
}

const IndexNode = ({ 
  workSlug, 
  node, 
  depth, 
  currentPath = [], 
  expandedNodes, 
  toggleNode,
  onSelect 
}: IndexNodeProps) => {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedNodes.has(node.id);
  const pathString = node.path.join('/');
  const isActive = currentPath.join('/') === pathString && node.hasContent;
  
  const paddingLeft = depth * 16;

  const handleClick = () => {
    if (hasChildren) {
      toggleNode(node.id);
    }
    if (onSelect && node.hasContent) {
      onSelect(node);
    }
  };

  const nodeLabel = node.number ? `${node.number}. ${node.title}` : node.title;

  const content = (
    <div
      className={cn(
        "flex items-center gap-2 py-2 px-3 rounded-sm cursor-pointer transition-colors",
        "hover:bg-muted/50",
        isActive && "bg-primary/10 text-primary font-medium"
      )}
      style={{ paddingLeft: `${paddingLeft + 12}px` }}
      onClick={handleClick}
    >
      {hasChildren ? (
        <span className="text-muted-foreground">
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </span>
      ) : (
        <span className="w-4" />
      )}
      <span className="text-sm line-clamp-2">{nodeLabel}</span>
    </div>
  );

  if (node.hasContent && !hasChildren) {
    return (
      <div>
        <Link href={`/read/${workSlug}/${pathString}`}>
          {content}
        </Link>
      </div>
    );
  }

  return (
    <div>
      {node.hasContent ? (
        <Link href={`/read/${workSlug}/${pathString}`}>
          {content}
        </Link>
      ) : (
        content
      )}
      
      {hasChildren && isExpanded && (
        <div className="animate-fade-in">
          {node.children!.map((child) => (
            <IndexNode
              key={child.id}
              workSlug={workSlug}
              node={child}
              depth={depth + 1}
              currentPath={currentPath}
              expandedNodes={expandedNodes}
              toggleNode={toggleNode}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const WorkIndex = ({ workSlug, index, currentPath = [], onSelect }: WorkIndexProps) => {
  // Auto-expand nodes that contain the current path
  const initialExpanded = useMemo(() => {
    const expanded = new Set<string>();
    
    const findPath = (node: WorkNode, targetPath: string[]): boolean => {
      if (node.path.join('/') === targetPath.join('/')) {
        return true;
      }
      if (node.children) {
        for (const child of node.children) {
          if (findPath(child, targetPath)) {
            expanded.add(node.id);
            return true;
          }
        }
      }
      return false;
    };
    
    if (currentPath.length > 0) {
      findPath(index, currentPath);
    }
    
    // Also expand root children by default
    if (index.children) {
      index.children.forEach(child => expanded.add(child.id));
    }
    
    return expanded;
  }, [index, currentPath]);

  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(initialExpanded);

  // Keep expanded nodes in sync when the initial expanded set changes,
  // e.g. when navigating to a different section.
  useEffect(() => {
    setExpandedNodes(initialExpanded);
  }, [initialExpanded]);

  const toggleNode = (id: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <nav className="py-2" aria-label="Índice de la obra">
      {index.children?.map((child) => (
        <IndexNode
          key={child.id}
          workSlug={workSlug}
          node={child}
          depth={0}
          currentPath={currentPath}
          expandedNodes={expandedNodes}
          toggleNode={toggleNode}
          onSelect={onSelect}
        />
      ))}
    </nav>
  );
};
