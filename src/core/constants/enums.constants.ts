export const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DELETED: 'deleted',
  TO_BE_DELETED: 'to_be_deleted',
};

export const BLOG_STATUS = {
  PUBLISHED: 'published',
  DRAFT: 'draft',
  DELETED: 'deleted',
  ARCHIVED: 'archived',
};

export const BLOG_TEMPLATE = {
  TEXT: 'text',
  VIDEO: 'video',
  AUDIO: 'audio',
  PHOTO_GALLERY: 'photo_gallery',
  LIVE: 'live',
};

export const CARD_ELEMENT_TYPE = {
  EMBEDJS: 'embedjs',
  TITLE: 'title',
  TEXT: 'text',
  IMAGE: 'image',
  VIDEO: 'video',
};

export const CARD_ELEMENT_SUBTYPE = {
  YOUTUBE: 'youtube',
  VIMEO: 'vimeo',
  TWITTER: 'twitter',
  INSTAGRAM: 'instagram',
  FACEBOOK: 'facebook',
  LINKEDIN: 'linkedin',
  TIKTOK: 'tiktok',
  PINTEREST: 'pinterest',
  SNAPCHAT: 'snapchat',
  TUMBLR: 'tumblr',
  REDDIT: 'reddit',
  QUORA: 'quora',
  MEDIUM: 'medium',
  GITHUB: 'github',
  STACKOVERFLOW: 'stackoverflow',
  VIMEO_VIDEO: 'vimeo_video',
  YOUTUBE_VIDEO: 'youtube_video',
  SOUNDCLOUD_AUDIO: 'soundcloud_audio',
  SPOTIFY_AUDIO: 'spotify_audio',
  TWITTER_TWEET: 'twitter_tweet',
  INSTAGRAM_POST: 'instagram_post',
  FACEBOOK_POST: 'facebook_post',
  LINKEDIN_POST: 'linkedin_post',
  TIKTOK_POST: 'tiktok_post',
  PINTEREST_PIN: 'pinterest_pin',
  SNAPCHAT_SNAP: 'snapchat_snap',
  REDDIT_POST: 'reddit_post',
  QUORA_POST: 'quora_post',
  MEDIUM_POST: 'medium_post',
};

export enum PRIORITY {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export const SUCCESS_STATUS = {
  SUCCESS: 'success',
  FAIL: 'failed',
};

export const FILE_UPLOAD_SERVICE = {
  S3: 'S3',
  LOCAL: 'LOCAL',
  CLOUDINARY: 'CLOUDINARY',
};

export const FILE_UPLOAD_STRATEGY = {
  CHUNKS: 'CHUNKS',
  FULL: 'FULL',
};

export const FILE_PATH_TYPE = {
  PUBLIC: 'public',
  PRIVATE: 'private',
};

export enum UserType {
  ADMIN = 'admin',
  USER = 'user',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHERS = 'others',
}

export const PAGINATION = {
  OFFSET: 'offset',
  PAGE: 'page',
  NO_PAGINATION: 'no-pagination',
  DEFAULT_LIMIT: 15,
  DEFAULT_PAGE: 1,
};

export enum ACTIONS {
  CREATE = 'create', // For creating courses, questions, assessments, etc.
  READ = 'read', // For viewing the details of an entity
  UPDATE = 'update', // For modifying entity details
  DELETE = 'delete', // For deleting an entity
  MARK_FOR_DELETION = 'mark_for_deletion', // For marking entities for deletion (soft delete)

  VIEW = 'view', // To track views of entities like courses or questions
  ATTEMPT = 'attempt', // For attempting questions or assessments
  COMPLETE = 'complete', // For completing a course, assessment, or practice
  SUBMIT = 'submit', // For submitting assessments or answers
  REVIEW = 'review', // For reviewing completed assessments or practice sessions
  REATTEMPT = 'reattempt', // For retrying questions, assessments, or practice

  UPLOAD = 'upload', // For uploading documents, notes, or other resources
  DOWNLOAD = 'download', // For downloading resources, notes, or results
  EXPORT = 'export', // For exporting user progress or reports

  FOLLOW = 'follow', // For following courses or instructors
  UNFOLLOW = 'unfollow', // For unfollowing courses or instructors
  UPVOTE = 'upvote', // For upvoting questions or content
  DOWNVOTE = 'downvote', // For downvoting questions or content
  RATE = 'rate', // For rating courses or assessments
  COMMENT = 'comment', // For commenting on courses or assessments
  LIKE = 'like', // For liking questions or content
  BOOKMARK = 'bookmark', // For bookmarking courses, questions, or content
  UNBOOKMARK = 'unbookmark', // For removing a bookmark

  SEARCH = 'search', // For searching courses, questions, or assessments
  FILTER = 'filter', // For filtering content (e.g., by difficulty or topic)

  LOGIN = 'login', // For logging into the platform
  LOGOUT = 'logout', // For logging out of the platform
  SHARE = 'share', // For sharing courses, assessments, or questions

  TRACK_PROGRESS = 'track_progress', // For tracking progress in courses or assessments
  START_PRACTICE = 'start_practice', // For initiating a practice session
  PAUSE_PRACTICE = 'pause_practice', // For pausing a practice session
  RESUME_PRACTICE = 'resume_practice', // For resuming a paused practice session

  TIME_SPENT = 'time_spent', // For tracking time spent on courses or assessments

  NEW_USER = 'new_user',
  ACTIVE_USER = 'active_user',
}

export enum AnalyticsInterval {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
}

export enum ENTITY_TYPE {
  COURSE = 'course', // Represents courses
  QUESTION = 'question', // Represents individual questions
  ASSESSMENT = 'assessment', // Represents assessments (quizzes, tests, etc.)
  PRACTICE = 'practice', // Represents practice sessions
  TOPIC = 'topic', // Represents topics within courses or questions
  PRACTICE_QUESTION = 'practice_question', // Represents questions within practice sessions
  ASSESSMENT_QUESTION = 'assessment_question', // Represents questions within assessments
  ACTIVITY = 'activity', // Represents user activities for time spent
  USER = 'user', // Represents users interacting with the platform
  DASHBOARD = 'dashboard', // Represents the user's dashboard
  PROGRESS_REPORT = 'progress_report', // Represents progress reports for users
  NOTIFICATION = 'notification', // Represents system notifications
  RESOURCE = 'resource', // Represents additional resources like files or notes
}

// create enum for days
export enum Days {
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday',
  SUNDAY = 'sunday',
}

export enum ModuleName {
  USER = 'user',
  AUTH = 'auth',
  ADMIN = 'admin',
  AUDIT_TRAIL = 'audittrail',
  FILE_UPLOAD = 'fileupload',
 
}



export enum DeviceType {
  ANDROID = 'Android',
  IOS = 'iOS',
  WEB = 'web',
  MAC = 'mac',
  WINDOW = 'windows',
  LINUX = 'linux',
  DESKTOP = 'Desktop',
  PHONE = 'Phone',
  OTHER = 'Other',
}

export enum RequestStatus
{
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}