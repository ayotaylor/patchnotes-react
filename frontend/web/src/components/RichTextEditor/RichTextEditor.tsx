import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Theme } from '../../theme/types';
import { RichTextEditorProps, RichTextContent } from './types';

const EditorContainer = styled.div<{ theme: Theme }>`
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  background-color: ${({ theme }) => theme.colors.background.paper};
  overflow: hidden;
`;

const Toolbar = styled.div<{ theme: Theme }>`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm}px;
  padding: ${({ theme }) => theme.spacing.sm}px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  background-color: ${({ theme }) => theme.colors.background.card};
`;

const ToolbarButton = styled.button<{ active?: boolean; theme: Theme }>`
  padding: ${({ theme }) => theme.spacing.sm}px;
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.primary.main : 'transparent'};
  color: ${({ active, theme }) =>
    active ? theme.colors.primary.contrast : theme.colors.text.primary};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.main};
  }
`;

const EditorContent = styled.div<{ theme: Theme; isEmpty?: boolean }>`
  padding: ${({ theme }) => theme.spacing.md}px;
  min-height: 200px;
  outline: none;
  position: relative;

  &[contenteditable="true"]:empty:before {
    content: attr(data-placeholder);
    color: ${({ theme }) => theme.colors.text.disabled};
    pointer-events: none;
    position: absolute;
  }

  & p {
    margin-bottom: ${({ theme }) => theme.spacing.sm}px;
    line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  }

  & h1, h2, h3 {
    margin-bottom: ${({ theme }) => theme.spacing.md}px;
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  & blockquote {
    border-left: 3px solid ${({ theme }) => theme.colors.primary.main};
    padding-left: ${({ theme }) => theme.spacing.md}px;
    margin: ${({ theme }) => theme.spacing.md}px 0;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  initialContent = [],
  onChange,
  placeholder,
  maxLength,
  readOnly
}) => {
  const [content, setContent] = useState<RichTextContent[]>(initialContent);
  const editorRef = useRef<HTMLDivElement>(null);
  const [isEmpty, setIsEmpty] = useState(!initialContent.length);

  const handleFormat = (command: string) => {
    document.execCommand(command, false);
    updateContent();
  };

  const updateContent = () => {
    if (!editorRef.current) return;

    const newContent: RichTextContent[] = [];
    editorRef.current.childNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;
        newContent.push({
          type: getNodeType(element),
          text: element.textContent || '',
          style: {
            bold: element.style.fontWeight === 'bold',
            italic: element.style.fontStyle === 'italic',
            underline: element.style.textDecoration === 'underline',
          },
        });
      }
    });

    setContent(newContent);
    setIsEmpty(!editorRef.current.textContent?.trim().length);
    onChange?.(newContent);
  };

  const getNodeType = (element: HTMLElement): RichTextContent['type'] => {
    switch (element.tagName.toLowerCase()) {
      case 'h1':
      case 'h2':
      case 'h3':
        return 'heading';
      case 'ul':
      case 'ol':
        return 'list';
      case 'blockquote':
        return 'quote';
      default:
        return 'paragraph';
    }
  };

  return (
    <EditorContainer>
      {!readOnly && (
        <Toolbar>
          <ToolbarButton
            onClick={() => handleFormat('bold')}
            title="Bold"
          >
            B
          </ToolbarButton>
          <ToolbarButton
            onClick={() => handleFormat('italic')}
            title="Italic"
          >
            I
          </ToolbarButton>
          <ToolbarButton
            onClick={() => handleFormat('underline')}
            title="Underline"
          >
            U
          </ToolbarButton>
          <ToolbarButton
            onClick={() => handleFormat('formatBlock')}
            title="Quote"
          >
            "
          </ToolbarButton>
        </Toolbar>
      )}

      <EditorContent
        ref={editorRef}
        contentEditable={!readOnly}
        onInput={updateContent}
        suppressContentEditableWarning
        data-placeholder={placeholder}
        isEmpty={isEmpty}
        dangerouslySetInnerHTML={{
          __html: content.map(renderContent).join(''),
        }}
      />
    </EditorContainer>
  );
};

const renderContent = (content: RichTextContent): string => {
  let html = content.text;
  if (content.style?.bold) html = `<strong>${html}</strong>`;
  if (content.style?.italic) html = `<em>${html}</em>`;
  if (content.style?.underline) html = `<u>${html}</u>`;

  switch (content.type) {
    case 'heading':
      return `<h2>${html}</h2>`;
    case 'quote':
      return `<blockquote>${html}</blockquote>`;
    case 'list':
      return `<ul><li>${html}</li></ul>`;
    default:
      return `<p>${html}</p>`;
  }
};