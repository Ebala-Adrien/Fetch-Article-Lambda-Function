import mongoose, { Schema } from 'mongoose';
import { ArticleCategory } from '../../data/index.js';

// Global text analysis metadata for the entire article
const ArticleAnalysisSchema = new Schema({
  lang: {
    type: String,
    required: true,
    maxlength: 10,
    index: true
  },
  model: {
    type: String,
    required: true,
    maxlength: 50,
    index: true
  },
  stats: {
    totalBlocks: { type: Number, required: true, min: 0 },
    totalSentences: { type: Number, required: true, min: 0 },
    totalTokens: { type: Number, required: true, min: 0 },
    totalWords: { type: Number, required: true, min: 0 }
  }
}, { _id: false });

// Text analysis element schema for granular word-level analysis
const TextElementSchema = new Schema({
  text: { type: String, required: true },
  lemma: { type: String },
  pos: { type: String },
  tag: { type: String },
  morph: { type: String, default: null },
  start: { type: Number, required: true, min: 0 },
  end: { type: Number, required: true, min: 0 },
  sentenceIndex: { type: Number, min: 0 },
  isStop: { type: Boolean, default: false },
  entityType: { type: String, default: null },
  // For separators and punctuation
  type: { 
    type: String, 
    enum: ['word', 'separator', 'punctuation'],
    default: 'word'
  },
  separatorType: { 
    type: String, 
    enum: ['whitespace', 'newline', 'other'],
    required: function() { return this.type === 'separator'; }
  }
}, { _id: false });

// Content block types for flexible article structure
const ContentBlockSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: ['title', 'subtitle', 'paragraph', 'image', 'quote', 'list']
  },
  content: {
    type: String,
    required: true,
    maxlength: 10000 // 10KB per block
  },
  // Granular text analysis for each content block
  analysis: [TextElementSchema],
  formatting: {
    bold: { type: Boolean, default: false },
    italic: { type: Boolean, default: false },
    underline: { type: Boolean, default: false },
    strikethrough: { type: Boolean, default: false }
  },
  // For image blocks
  imageUrl: { type: String },
  imageAlt: { type: String },
  imageCaption: { type: String },
  // For quote blocks
  quoteAuthor: { type: String },
  // For list blocks
  listItems: [{ type: String }],
  listType: { 
    type: String, 
    enum: ['ordered', 'unordered'],
    default: 'unordered'
  },
  // Order within the article
  order: { type: Number, required: true, min: 0 }
}, { _id: false });

// Main Article schema
const ArticleSchema = new Schema({
  // Basic article information
  title: {
    type: String,
    required: true,
    maxlength: 200,
    index: true
  },
  titleAnalysis: [TextElementSchema],
  description: {
    type: String,
    maxlength: 500,
    index: true
  },
  descriptionAnalysis: [TextElementSchema],
  author: {
    type: String,
    required: true,
    maxlength: 100,
    index: true
  },
  language: {
    type: String,
    required: true,
    maxlength: 10,
    index: true
  },
  source: {
    type: String,
    enum: [ "bbc", "terra" ],
    index: true
  },
  
  // Media
  featuredImageUrl: {
    type: String,
    maxlength: 500
  },
  featuredImageAlt: {
    type: String,
    maxlength: 200
  },
  
  // Content structure
  content: [ContentBlockSchema],
  
  // URLs
  articleUrl: {
    type: String,
    maxlength: 500,
    required: true,
    unique: true,
    index: true
  },
  
  // Text analysis metadata (global stats only)
  textAnalysis: {
    type: ArticleAnalysisSchema,
    default: null
  },
  
  // Publication metadata
  publicationDate: {
    type: Date,
    required: true,
    index: true
  },
  
  // Status and visibility
  status: {
    type: String,
    required: true,
    enum: ['draft', 'archived', 'pending', 'processing', 'completed', 'failed'],
    default: 'pending',
    index: true
  },
  
  // Processing metadata
  processingStartedAt: {
    type: Date,
    default: null
  },
  processingCompletedAt: {
    type: Date,
    default: null
  },
  processingError: {
    type: String,
    default: null
  },
  
  // SEO and metadata
  tags: [{
    type: String,
    maxlength: 50
  }],
  category: {
    type: String,
    enum: Object.values(ArticleCategory),
    index: true,
    default: null
  },
  
  // Reading metrics
  estimatedReadingTime: {
    type: Number,
    min: 0,
    default: 0
  },
  wordCount: {
    type: Number,
    min: 0,
    default: 0
  },
  
  // Analysis status
  analysisStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
    index: true
  },
  analysisDate: {
    type: Date
  },
  analysisError: {
    type: String,
    maxlength: 1000
  },
  
  // Usage tracking for cleanup
  hasBeenRead: {
    type: Boolean,
    default: false,
    index: true
  },
  firstReadAt: {
    type: Date,
    index: true
  },
  lastReadAt: {
    type: Date,
    index: true
  },
  readCount: {
    type: Number,
    default: 0,
    min: 0,
    index: true
  },
}, {
  timestamps: true,
  collection: 'articles'
});

// Export the model
const Article = mongoose.models.Article || mongoose.model('Article', ArticleSchema);

export default Article;
