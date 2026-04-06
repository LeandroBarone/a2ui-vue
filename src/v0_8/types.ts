import * as WebCore from '@a2ui/web_core/v0_8';

export namespace Types {
  export type Action = WebCore.Action;
  export type FunctionCall = unknown;
  export type SurfaceID = string;
  export type StringValue = WebCore.StringValue;
  export type BooleanValue = WebCore.BooleanValue;
  export type NumberValue = WebCore.NumberValue;
  export type Surface = WebCore.Surface;

  export type A2UIClientEventMessage = WebCore.A2UIClientEventMessage;
  export type ClientToServerMessage = A2UIClientEventMessage;
  export type ServerToClientMessage = WebCore.ServerToClientMessage;

  export interface Component<P = Record<string, unknown>> {
    id: string;
    type: string;
    properties: P;
  }

  export type AnyComponentNode = WebCore.AnyComponentNode;
  export type CustomNode = WebCore.CustomNode;

  export type Theme = WebCore.Theme;

  export type RowNode = WebCore.RowNode;
  export type ColumnNode = WebCore.ColumnNode;
  export type TextNode = WebCore.TextNode;
  export type ListNode = WebCore.ListNode;
  export type ImageNode = WebCore.ImageNode;
  export type IconNode = WebCore.IconNode;
  export type VideoNode = WebCore.VideoNode;
  export type AudioPlayerNode = WebCore.AudioPlayerNode;
  export type ButtonNode = WebCore.ButtonNode;
  export type DividerNode = WebCore.DividerNode;
  export type MultipleChoiceNode = WebCore.MultipleChoiceNode;
  export type TextFieldNode = WebCore.TextFieldNode;
  export type CheckboxNode = WebCore.CheckboxNode;
  export type SliderNode = WebCore.SliderNode;
  export type DateTimeInputNode = WebCore.DateTimeInputNode;
  export type TabsNode = WebCore.TabsNode;
  export type ModalNode = WebCore.ModalNode;
  export type CardNode = WebCore.CardNode;

  export type ResolvedRow = WebCore.ResolvedRow;
  export type ResolvedColumn = WebCore.ResolvedColumn;
  export type ResolvedText = WebCore.ResolvedText;
  export type ResolvedList = WebCore.ResolvedList;
  export type ResolvedImage = WebCore.ResolvedImage;
  export type ResolvedIcon = WebCore.ResolvedIcon;
  export type ResolvedVideo = WebCore.ResolvedVideo;
  export type ResolvedAudioPlayer = WebCore.ResolvedAudioPlayer;
  export type ResolvedButton = WebCore.ResolvedButton;
  export type ResolvedDivider = WebCore.ResolvedDivider;
  export type ResolvedMultipleChoice = WebCore.ResolvedMultipleChoice;
  export type ResolvedTextField = WebCore.ResolvedTextField;
  export type ResolvedCheckbox = WebCore.ResolvedCheckbox;
  export type ResolvedSlider = WebCore.ResolvedSlider;
  export type ResolvedDateTimeInput = WebCore.ResolvedDateTimeInput;
  export type ResolvedTabs = WebCore.ResolvedTabs;
  export type ResolvedModal = WebCore.ResolvedModal;
  export type ResolvedCard = WebCore.ResolvedCard;

  export type MarkdownRenderer = WebCore.MarkdownRenderer;
  export type MarkdownRendererOptions = WebCore.MarkdownRendererOptions;
}
