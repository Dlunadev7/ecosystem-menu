import Image from 'next/image';
import React from 'react'
import { EmojiProps } from './emoji.interface';
import { EmojiTags } from '@/shared/utils/emoji';

const emojiConfig = {
  [EmojiTags.ANGUISHED_FACE]: 'anguished_face',
  [EmojiTags.FACE_SCREAMING_AND_FEAR]: 'face_screaming_n_fear',
  [EmojiTags.FACE_WITH_HEAD_BANDAGE]: 'face_with_head_bandage',
  [EmojiTags.FACE_WITH_MONOCLE]: 'face_with_monocle',
  [EmojiTags.GRINNING_FACE_WITH_SWEAT]: 'grinning_face_with_sweat',
  [EmojiTags.PARTYING_FACE]: 'partying_face',
  [EmojiTags.SMILING_FACE_WITH_SUNGLASSES]: 'smiling_face_with_sunglasses',
  [EmojiTags.THINKING_FACE]: 'thinking_face',
  [EmojiTags.PINCHED_FINGERS]: 'pinched_fingers',
  [EmojiTags.WINKING_FACE_WITH_TONGUE]: 'winking_face_with_tongue',
  [EmojiTags.WAVING_HAND]: 'waving_hand',
};

export const Emoji = (props: EmojiProps) => {
  const { tag, width = 64, height = 64 } = props;

  if (emojiConfig[tag]) {
    try {
      const svgSrc = require(`@/assets/emojis/${emojiConfig[tag]}.svg`).default;
      return <Image src={svgSrc} alt={tag} width={width} height={height} />;
    } catch (error) {
      const pngSrc = require(`@/assets/emojis/${emojiConfig[tag]}.png`).default;
      return <Image src={pngSrc} alt={tag} width={width} height={height} />;
    }
  } else {
    return <span>No se encontró el emoji</span>;
  }
};