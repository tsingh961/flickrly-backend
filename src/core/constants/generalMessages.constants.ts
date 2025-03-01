export const MESSAGE = {
  SLUG: {
    ADDED: 'Slug created successfully.',
    ADD_FAILED: 'Error while creating slug.',
    FETCHED_ALL: 'All slugs fetched successfully.',
    FETCHED_ALL_FAILED: 'Error while fetching all slugs.',
    FETCHED: (id: string): string => `Slug with ${id} fetched successfully.`,
    FETCH_FAILED: (id: string): string =>
      `Error while fetching slug with id ${id}`,
    UPDATED: (id: string): string => `Slug with ${id} updated successfully.`,
    UPDATE_FAILED: (id: string): string =>
      `Error while updating slug with id ${id}`,
    DELETED: (id: string): string => `Slug with ${id} deleted successfully.`,
    DELETE_FAILED: (id: string): string =>
      `Error while deleting slug with id ${id}`,
    NOT_FOUND: 'Slug not found.',
  },
  ANALYTICS: {
    LIST_FETCHED: 'Analytics list fetched successfully.',
    LIST_FETCHED_FAILED: 'Error fetching analytics list.',
    ERROR: {
      FETCHING: 'Error while fetching analytics data.',
    },
  },

  AUDITTRAIL: {
    LIST_FETCHED: 'Audit trail list fetched successfully.',
    LIST_FETCHED_FAILED: 'Error fetching audit trail list.',
  },

  USER: {
    ID_REQUIRED: 'User Id is required.',
    NOT_FOUND: 'User not found.',
    EXIST: 'User exists.',
    ADDED: 'User created successfully.',
    DATA_NOT_FOUND: 'User data not found.',
    DETAILS_FETCHED: 'User details fetched successfully.',
    LIST_FETCHED: 'Users list fetched successfully.',
    LIST_FETCHED_FAILED: 'Failed to fetch users.',
    UPDATED: 'User updated successfully.',
    DELETED: 'User deleted successfully.',
    DOB_REQUIRED: 'date of birth cannot be empty.',
    INVALID_DOB_FORMAT: 'Invalid date of birth format.',
    ERRORS: {
      CREATING: 'Error while creating user.',
      FETCHING: 'Error while fetching user.',
      UPDATING: 'Error while updating user.',
      DELETING: 'Error while deleting user.',
      ADD_CONFLICT: 'User already exists with this email or username.',
      ADD_CONFLICT_EMAIL: 'User already invited with this email.',
      NOT_FOUND_WITH_EMAIL_OR_MOBILE:
        'User not found with the given mobile number or email.',
      USER_STATUS_TO_BE_DELETED:
        'Your account is scheduled for deletion and cannot be accessed at this time. Please contact support if you wish to reactivate your account.',
    },
  },
  ADMIN: {
    ID_REQUIRED: 'Admin Id is required.',
    NOT_FOUND: 'Admin not found.',
    EXIST: 'Admin exists.',
    ADDED: 'Admin created successfully.',
    DATA_NOT_FOUND: 'Admin data not found.',
    DETAILS_FETCHED: 'Admin details fetched successfully.',
    LIST_FETCHED: 'Admin list fetched successfully.',
    LIST_FETCHED_FAILED: 'Failed to fetch admins.',
    UPDATED: 'Admin updated successfully.',
    DELETED: 'Admin deleted successfully.',
    ERRORS: {
      CREATING: 'Error while creating admin.',
      FETCHING: 'Error while fetching admin.',
      UPDATING: 'Error while updating admin.',
      DELETING: 'Error while deleting admin.',
      ADD_CONFLICT: 'Admin already exists with this email or username.',
      NOT_FOUND_WITH_EMAIL_OR_MOBILE:
        'Admin not found with the given mobile number or email.',
      USER_STATUS_TO_BE_DELETED:
        'Your account is scheduled for deletion and cannot be accessed at this time. Please contact support if you wish to reactivate your account.',
    },
  },

  ROLE: {
    ADDED: 'Role created successfully.',
    DATA_NOT_FOUND: 'Role data not found.',
    DETAILS_FETCHED: 'Role details fetched successfully.',
    ID_REQUIRED: 'Role Id is required.',
    LIST_FETCHED: 'Roles list fetched successfully.',
    LIST_FETCHED_FAILED: 'Failed to fetch roles.',
    NOT_FOUND: 'Role not found.',
    UPDATED: 'Role updated successfully.',
    DELETED: 'Role deleted successfully.',
    ERRORS: {
      CREATING: 'Error while creating role',
      FETCHING: 'Error while fetching role',
      UPDATING: 'Error while updating role',
      DELETING: 'Error while deleting role',
      ADD_CONFLICT: 'Role already exists with this slug.',
    },
  },
  AUTH: {
    LOGOUT_SUCCESSFUL: 'Logout successful',
    SIGNUP_SUCCESSFUL: 'Signup successful',
    SIGNUP_FAILED: 'Signup failed',
    TOKEN_REFRESH: 'Access token and refresh token are refreshed successfully',
    LOGIN_SUCCESSFUL: 'Login successful',
    USER_NOT_FOUND: 'User not found.',
    USER_UPDATED: 'User updated successfully.',
    USER_EXISTS: 'User already exists.',
    OTP_SENT: 'OTP sent successfully',
    OTP_VERIFIED: 'OTP verified successfully.',
    OTP_INVALID: 'Invalid OTP.',
    OTP_VERIFICATION_FAILED: 'OTP Verification Failed.',
    PASSWORD_RESET_SUCCESS: 'Password reset successful.',
    PASSWORD_UPDATED: 'Password updated successfully.',
    FORGOT_PASSWORD_LINK_SENT: 'Forgot password link sent successfully.',
    FORGOT_PASSWORD_LINK_EXPIRED: 'Forgot password link expired.',
    FORGOT_PASSWORD_LINK_INVALID: 'Invalid forgot password link.',
    FORGOT_PASSWORD_LINK_UPDATED: 'Forgot password link updated successfully.',
    INVITE_SUBJECT: 'Invitation to join',
    INVITE_SUCCESSFUL: 'Invite successful',
    REGISTRATION_SUCCESSFUL: 'Registration successful',
    VERIFICATION_SUCCESSFUL: 'Verification successful',
    TOKEN_VERIFIED: 'Token verified successfully',
    FORGET_PASSWORD_SUCCESS: 'Forgot password link sent successfully',
    ERROR: {
      REGISTER_FAILED: 'Registration failed',
      VERIFICATION_FAILED: 'Verification failed',
      LOGIN_FAILED_INVALID: 'Email/mobile number or password is invalid',
      LOGOUT_FAILED: 'Logout failed',
      LOGIN_FAILED: 'Failed to login',
      INVITE_FAILED: 'Invite failed',
      USER_NOT_FOUND: 'User not found',
      USER_EXISTS: 'User already exists',
      OTP_SEND_FAILED: 'Failed to send OTP',
      OTP_VERIFIED: 'OTP verified successfully',
      OTP_EXPIRED: 'OTP expired',
      OTP_INVALID: 'Invalid OTP',
      PASSWORD_RESET_FAILED: 'Failed to reset password',
      FORGOT_PASSWORD_LINK_EXPIRED: 'Forgot password link expired',
      FORGOT_PASSWORD_LINK_INVALID: 'Invalid forgot password link',
      FORGOT_PASSWORD_LINK_UPDATED: 'Forgot password link updated successfully',
      FORGET_PASSWORD_FAILED: 'Forgot password failed',
      TOKEN_REFRESH_FAILED: 'Token refresh failed',
      FORGOT_PASSWORD_REQUIRED:
        'Phone Number or Email required to reset password',
      EMAIL_NOT_VERIFIED: 'Email not verified please try again',
      MOBILE_NOT_VERIFIED:
        'Mobile number not verified please try again with email address',
      INVALID_PASSWORD: 'Wrong password',
      SIGNUP_FAILED: 'Failed to signup',
      INVITE_SEND_FAILED: 'Failed to send invite.',
      INVALID_INVITE_TOKEN: 'Invalid invitation link.',
      INVALID_INVITE_PARAMS: 'Invalid invitation params.',
      INVITE_EXPIRED: 'Invitation expired.',
      VERIFY_FORGET_PASSWORD_OTP_FAILED: 'Failed to verify forget password OTP',
      RESET_PASSWORD_FAILED: 'Failed to reset password',
    },
  },
  FORBIDDEN_MESSAGE: {
    NOT_ALLOWED_ADMIN_PANEL: 'You are not allowed to login to the admin panel',
    ACCESS_DENIED: 'Access Denied',
    CANNOT_ACCESS_DATA: (userType: string): string =>
      `${userType} cannot access this data`,
  },
  OTP: {
    EMAIL: 'OTP has been sent to your email address',
    MOBILE: 'OTP has been sent to your number',
    ERRORS: {
      NOT_MATCH: 'OTP does not match',
      EXPIRED: 'OTP Expired please try again',
      INVALID_EMAIL_PHONE: 'Invalid email',
    },
  },
  BAD_REQUEST: {
    LOGIN: 'Password or otp is required',
    SERVICE_URL_NOT_FOUND: 'No service URL found',
    EMAIL_OR_MOBILE: 'Either email or mobile number is required',
  },
  SUBJECT: {
    FORGET_PASSWORD_OTP_SUBJECT: (otp: number, brandName: string): string =>
      `${otp} is your OTP for password reset - ${brandName}`,
    OTP_VERIFICATION: (otp: number, brandName: string): string =>
      `${otp} is your verification code - ${brandName}`,
    PASSWORD_CHANGED: 'Password Changed Successfully',
  },
  GENERAL: {
    INVALID_TIME_FORMAT: 'Time must be in HH:mm format',
  },
  FILE: {
    ADDED: 'File Uploaded SuccessFully',
    LIST_FETCHED: 'File List Fetched',
    LIST_FETCHED_FAILED: 'Error While fetching File List',
    FETCHED: 'File Fetched',
    FETCHED_FAILED: 'Error While fetching File',
    DELETED: 'File Deleted',
    DELETED_FAILED: 'Error While Deleting File',
    NOT_FOUND: 'File Not Found',
    FILE_NOT_FOUND: 'File Not Found',
  },

  COURSE: {
    CREATED: 'Course created successfully',
    UPDATED: 'Course updated successfully',
    DELETED: 'Course deleted successfully',
    NOT_FOUND: 'Course not found',
    DETAILS_FETCHED: 'Course details fetched successfully',
    ADDED: 'Course created successfully.',
    LIST_FETCHED: 'Course list fetched successfully.',
    LIST_FETCHED_FAILED: 'Failed to fetch course list.',
    ERRORS: {
      CREATING: 'Error creating course',
      UPDATING: 'Error updating course',
      DELETING: 'Error deleting course',
      FETCHING: 'Error fetching course',
      UPDATING_STATUS: 'Error updating course status',
      SLUG_EXISTS: 'Course with this slug already exists',
      ALREADY_DELETED: 'Course already deleted',
      ENROLLMENT_TOGGLE: 'Cannot toggle emrollment.',
    },
  },

  DIFFICULTY_LEVEL: {
    // Success Messages
    ADDED: 'Difficulty level has been added successfully.',
    UPDATED: 'Difficulty level has been updated successfully.',
    DELETED: 'Difficulty level has been deleted successfully.',
    FETCHED: (id: string): string =>
      `Difficulty level with ID ${id} fetched successfully.`,
    DETAILS_FETCHED: 'Difficulty level details fetched successfully.',
    LIST_FETCHED: 'Difficulty levels fetched successfully.',
    LIST_FETCHED_FAILED: 'Failed to fetch difficulty levels.',
    STATUS_CHANGED: 'Difficulty level status changed successfully.',
    STATUS_CHANGE_FAILED: 'Failed to change difficulty level status.',

    // Error Messages
    NOT_FOUND: 'Difficulty level not found.',
    ID_REQUIRED: 'Difficulty level ID is required.',
    DATA_NOT_FOUND: 'Difficulty level data not found.',
    EXIST: 'Difficulty level exists.',

    ERRORS: {
      CREATING: 'Error occurred while creating the difficulty level.',
      UPDATING: 'Error occurred while updating the difficulty level.',
      DELETING: 'Error occurred while deleting the difficulty level.',
      FETCHING: 'Error occurred while fetching the difficulty level.',
      UPDATING_STATUS: 'Error occurred while updating difficulty level status.',
      SLUG_EXISTS: 'Difficulty level with this slug already exists.',
      ALREADY_DELETED: 'Difficulty level is already deleted.',
      ADD_CONFLICT: 'Difficulty level already exists with this name.',
      NOT_FOUND_WITH_ID: (id: string): string =>
        `Difficulty level with ID ${id} not found.`,
      ITEM_NOT_FOUND: (entityLabel: string): string =>
        `Some ${entityLabel} items were not found`,
    },
  },
  COURSE_CONTENT: {
    // Success Messages
    ADDED: 'Course content has been added successfully.',
    UPDATED: 'Course content has been updated successfully.',
    DELETED: 'Course content has been deleted successfully.',
    FETCHED: (id: string): string =>
      `Course content with ID ${id} fetched successfully.`,
    DETAILS_FETCHED: 'Course content details fetched successfully.',
    LIST_FETCHED: 'Course contents fetched successfully.',
    LIST_FETCHED_FAILED: 'Failed to fetch Course contents.',
    STATUS_CHANGED: 'Course content status changed successfully.',
    STATUS_CHANGE_FAILED: 'Failed to change Course content status.',

    // Error Messages
    NOT_FOUND: 'Course content not found.',
    ID_REQUIRED: 'Course content ID is required.',
    DATA_NOT_FOUND: 'Course content data not found.',
    EXIST: 'Course content exists.',

    ERRORS: {
      CREATING: 'Error occurred while creating the course content.',
      UPDATING: 'Error occurred while updating the course content.',
      DELETING: 'Error occurred while deleting the course content.',
      FETCHING: 'Error occurred while fetching the course content.',
      UPDATING_STATUS: 'Error occurred while updating course content status.',
      SLUG_EXISTS: 'course content with this slug already exists.',
      ALREADY_DELETED: 'course content is already deleted.',
      ADD_CONFLICT: 'course content already exists with this name or slug.',
      NOT_FOUND_WITH_ID: (id: string): string =>
        `course content with ID ${id} not found.`,
      ITEM_NOT_FOUND: (entityLabel: string): string =>
        `Some ${entityLabel} items were not found`,
    },
  },

  QUESTION: {
    // Success Messages
    ADDED: 'Question has been added successfully.',
    UPDATED: 'Question has been updated successfully.',
    DELETED: 'Question has been deleted successfully.',
    FETCHED: (id: string): string =>
      `Question with ID ${id} fetched successfully.`,
    DETAILS_FETCHED: 'Question details fetched successfully.',
    LIST_FETCHED: 'Questions fetched successfully.',
    LIST_FETCHED_FAILED: 'Failed to fetch questions.',
    STATUS_CHANGED: 'Question status changed successfully.',
    STATUS_CHANGE_FAILED: 'Failed to change question status.',
    BULK_UPLOADED: 'Questions bulk uploaded successfully.',

    // Error Messages
    NOT_FOUND: 'Question not found.',
    ID_REQUIRED: 'Question ID is required.',
    DATA_NOT_FOUND: 'Question data not found.',
    EXIST: 'Question already exists.',

    ERRORS: {
      CREATING: 'Error occurred while creating the question.',
      UPDATING: 'Error occurred while updating the question.',
      DELETING: 'Error occurred while deleting the question.',
      FETCHING: 'Error occurred while fetching the question.',
      UPDATING_STATUS: 'Error occurred while updating question status.',
      ALREADY_DELETED: 'Question is already deleted.',
      INVALID_COURSE: 'Invalid course selected for the question.',
      INVALID_DIFFICULTY_LEVEL:
        'Invalid difficulty level selected for the question.',
      NOT_FOUND_WITH_ID: (id: string): string =>
        `Question with ID ${id} not found.`,
      ITEM_NOT_FOUND: (entityLabel: string): string =>
        `Some ${entityLabel} items were not found`,
      COURSE_NOT_FOUND: 'Course not found with the provided ID.',
      DIFFICULTY_LEVEL_NOT_FOUND:
        'Difficulty level not found with the provided ID.',
      QUESTION_EXISTS:
        'Question already exists with this question text in the course.',
    },

    VALIDATION: {
      QUESTION_TEXT_REQUIRED: 'Question text is required.',
      CORRECT_ANSWER_REQUIRED: 'Correct answer is required.',
      COURSE_REQUIRED: 'Course is required.',
      DIFFICULTY_LEVEL_REQUIRED: 'Difficulty level is required.',
      INVALID_STATUS: 'Invalid status provided.',
    },
  },

  USER_ASSESSMENT: {
    // Success Messages
    ADDED: 'User assessment has been added successfully.',
    UPDATED: 'User assessment has been updated successfully.',
    DELETED: 'User assessment has been deleted successfully.',
    DETAILS_FETCHED: 'User assessment details fetched successfully.',
    LIST_FETCHED: 'User assessments fetched successfully.',
    REPORT_FETCHED: 'Report data fetched successfully.',
    LIST_FETCHED_FAILED: 'Failed to fetch user assessments.',
    STARTED: 'Assessment started successfully',
    NO_MORE_QUESTIONS: 'No more questions available for this course',
    NO_QUESTIONS_AVAILABLE: 'No questions available for this course',
    ALL_QUESTIONS_ANSWERED:
      'You have answered all the questions in this assessment.',
    SESSION_DATA_FETCHED: 'Session data fetched successfully',
    NOT_FOUND: 'User assessment not found.',
    SESSIONS_FETCHED: 'Sessions fetched successfully',
    NEXT_QUESTION_FETCHED: 'Next practice question retrieved successfully.',
    ERRORS: {
      CREATING: 'Error occurred while creating the user assessment.',
      UPDATING: 'Error occurred while updating the user assessment.',
      DELETING: 'Error occurred while deleting the user assessment.',
      FETCHING: 'Error occurred while fetching the user assessment.',
      FETCHING_REPORT: 'Error occurred while fetching the user report.',
      ALREADY_DELETED: 'User assessment is already deleted.',
      INVALID_USER: 'Invalid user provided for the assessment.',
      INVALID_COURSE: 'Invalid course provided for the assessment.',
      USER_NOT_FOUND: 'The specified user does not exist.',
      COURSE_NOT_FOUND: 'The specified course does not exist.',
      STARTING: 'Error starting assessment',
      FETCHING_SESSION_DATA: 'Error fetching session data',
      ALREADY_COMPLETED: 'This session has already been completed.',
      GETTING_NEXT_QUESTION: 'Error fetching next question',
    },
  },

  EVALUATION: {
    ADDED: 'Answer submitted successfully',
    UPDATED: 'Evaluation updated successfully',
    DETAILS_FETCHED: 'Evaluation details fetched successfully',
    LIST_FETCHED: 'Evaluations fetched successfully',
    STARTED: 'Assessment started successfully',
    NO_QUESTIONS_AVAILABLE: 'No questions available for this course',
    GREETING: (userName: string): string =>
      `Hello ${userName}, welcome to your assessment! We're thrilled to have you here. Take a deep breath, stay focused, and remember that this is your opportunity to showcase your knowledge. All the best as you progress through the questions!`,
    PRACTICE_GREETING: (userName: string): string =>
      `**Get ready to enhance your knowledge, ${userName}! Embrace the challenge and enjoy the learning journey!**`,
    TYPE_MESSAGE: `**Start typing your answer**`,
    FLAGGED: 'Evaluation flagged successfully',
    ERRORS: {
      CREATING: 'Error in evaluation',
      UPDATING: 'Error updating evaluation',
      FETCHING: 'Error fetching evaluation(s)',
      STARTING: 'Error starting assessment',
      FLAGGING: 'Error flagging evaluation',
      NOT_FOUND: 'Evaluation not found',
      ALREADY_SUBMITTED:
        'You have already submitted an answer for this question.',
    },
  },

  LEADERBOARD: {
    ADDED: 'Leaderboard entry added successfully.',
    LIST_FETCHED: 'Leaderboard entries fetched successfully.',
    DETAILS_FETCHED: 'Leaderboard entry details fetched successfully.',
    ERRORS: {
      CREATING: 'Error creating leaderboard entry.',
      FETCHING: 'Error fetching leaderboard entry.',
      LIST_FETCHED_FAILED: 'Error fetching leaderboard entries.',
    },
  },

  PROMPT: {
    CREATED: 'Prompt created successfully.',
    CREATE_FAILED: 'Failed to create prompt.',
    FETCHED: (id: string): string =>
      `Prompt with ID ${id} fetched successfully.`,
    FETCH_FAILED: (id: string): string =>
      `Failed to fetch prompt with ID ${id}.`,
    FETCHED_ALL: 'All prompts fetched successfully.',
    FETCHED_ALL_FAILED: 'Failed to fetch all prompts.',
    UPDATED: (id: string): string =>
      `Prompt with ID ${id} updated successfully.`,
    UPDATE_FAILED: (id: string): string =>
      `Failed to update prompt with ID ${id}.`,
    DELETED: (id: string): string =>
      `Prompt with ID ${id} deleted successfully.`,
    DELETE_FAILED: (id: string): string =>
      `Failed to delete prompt with ID ${id}.`,
  },

  DEFAULT_PROMPT: `
  Evaluation Guidelines (Make the tone funny and engaging make sure to use you instead of user ):
 
          - Analyze Strengths: Identify where the user's answer aligns well with the ideal answer.
          - Highlight Weaknesses: Point out any discrepancies or areas where the response lacks detail, clarity, or relevance compared to the ideal answer.
          - Suggest Improvements: Provide constructive, actionable feedback to guide the user in enhancing their response.
          - Always display the ideal answer for reference.
       
        Scoring Instructions:
 
          - The score should be a numeric value between 0 and {maxScore}, rounded to the nearest whole number.
          - Take into account the {adminFeedback} which the admin provided on the user's answer when calculating the score.
          - Ensure the score is always a number, with a minimum value of 0. If the {studentAnswer} is irrelevant to the {question}, please assign a score of 0.`,

  SWAGGER: {
    SLUG: {
      CREATE: 'Create a slug',
      LIST: 'Get a list of slugs',
      GET: 'Get details of a slug by ID',
      UPDATE: 'Update a slug by ID',
      DELETE: 'Delete a slug by ID',
    },

    ADMIN: {
      CREATE: 'Create a admin',
      LIST: 'Get a list of admins',
      GET: 'Get details of a admin by ID',
      UPDATE: 'Update a admin by ID',
      DELETE: 'Delete a admin by ID',
    },
    USER: {
      CREATE: 'Create a user',
      LIST: 'Get a list of users',
      GET: 'Get details of a user by ID',
      UPDATE: 'Update a user by ID',
      DELETE: 'Delete a user by ID',
    },
    COURSE: {
      CREATE: 'Create a course',
      LIST: 'Get a list of courses',
      GET: 'Get details of a course by ID',
      UPDATE: 'Update a course by ID',
      DELETE: 'Delete a course by ID',
    },
    DIFFICULTY_LEVEL: {
      CREATE: 'Create a difficulty level',
      LIST: 'Get a list of difficulty levels',
      GET: 'Get details of a difficulty level by ID',
      UPDATE: 'Update a difficulty level by ID',
      DELETE: 'Delete a difficulty level by ID',
    },
    QUESTION: {
      CREATE: 'Create a new question',
      LIST: 'Get a list of questions',
      GET: 'Get details of a question by ID',
      UPDATE: 'Update a question by ID',
      DELETE: 'Delete a question by ID',
      UPDATE_STATUS: 'Update question status',
    },

    USER_ASSESSMENT: {
      CREATE: 'Create a new user assessment',
      LIST: 'Get a list of user assessments',
      GET: 'Get details of a user assessment by ID',
      UPDATE: 'Update a user assessment by ID',
      DELETE: 'Delete a user assessment by ID',
      GET_SESSION_DATA:
        'Retrieve session data for a specific assessment, including evaluated questions and answers.',
    },

    EVALUATION: {
      CREATE: 'Create new evaluation',
      UPDATE: 'Update evaluation',
      GET: 'Get evaluation by ID',
      GET_BY_ASSESSMENT: 'Get evaluations by assessment ID',
      LIST: 'Get all evaluations',
      START_ASSESSMENT: 'Start new assessment for course',
    },
    COURSE_CONTENT: {
      CREATE: 'Create a new course content.',
      UPDATE: 'Update course content by Id.',
      GET: 'Get course content by Id.',
      LIST: 'Get all course contents.',
      DELETE: 'Delete course content by Id.',
    },
  },
  GENERATION: {
    SUCCESSFULL: 'Generation Successfull',
    FAILED: 'Generation Failed',
  },
  INVITE: {
    ADDED: 'Invite created successfully.',
    DATA_NOT_FOUND: 'Invite data not found.',
    DETAILS_FETCHED: 'Invite details fetched successfully.',
    ID_REQUIRED: 'Invite Id is required.',
    LIST_FETCHED: 'Invites list fetched successfully.',
    NOT_FOUND: 'Invalid or expired token Please ask admin for new invite.',
    UPDATED: 'Invite updated successfully.',
    DELETED: 'Invite deleted successfully.',
    ERRORS: {
      CREATING: 'Error while creating Invite',
      FETCHING: 'Error while fetching Invite',
      UPDATING: 'Error while updating Invite',
      DELETING: 'Error while deleting Invite',
      LIST_FETCHED_FAILED: 'Failed to fetch Invites',
      ALREADY_USED: 'This invite has already been used.',
      EXPIRED: 'This invite has expired.',
      UNAUTHORIZED: 'This invite cannot be used to register.',
    },
  },

  USER_ACTIVITY: {
    ADDED: 'User activity has been recorded successfully.',
    UPDATED: 'User activity has been updated successfully.',
    DELETED: 'User activity has been deleted successfully.',
    FETCHED: (id: string): string =>
      `User activity with ID ${id} fetched successfully.`,
    LIST_FETCHED: 'User activities fetched successfully.',
    LIST_FETCHED_FAILED: 'Failed to fetch user activities.',
    NOT_FOUND: 'User activity not found.',
    ERRORS: {
      CREATING: 'Error occurred while creating the user activity.',
      UPDATING: 'Error occurred while updating the user activity.',
      DELETING: 'Error occurred while deleting the user activity.',
      FETCHING: 'Error occurred while fetching the user activity.',
      NOT_FOUND_WITH_ID: (id: string): string =>
        `User activity with ID ${id} not found.`,
    },
  },
};
