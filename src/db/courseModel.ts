import mongoose from "mongoose";
const CourseSchema = new mongoose.Schema({
    title: String,
    info: String,
    lessons: [{
      title: String,
      intro: String,
      chapters: [{
        title: String,
        media: {
          url: String,
          mediaType: String
        },
        text: String,
        isCompleted: Boolean
      }],
      exam: {
        questions: [{
          theQuestion: String,
          answers: [String],
          correctAnswer: String
        }],
        isCompleted: Boolean,
        score: Number
      },
      percentageCompletion: Number
    }]
  });
  
  export const CourseModel = mongoose.model('Course', CourseSchema);

  