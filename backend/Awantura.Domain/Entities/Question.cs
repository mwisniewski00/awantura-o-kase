using Awantura.Domain.Enums;

namespace Awantura.Domain.Entities
{
    public class Question
    {
        public Guid Id { get; set; }
        
        public string QuestionText { get; set; }
        public string Answers { get; set; }
        public int CorrectAnswer { get; set; }
        public Category Category { get; set; }
        public int PointsForCorrectAnswer { get; set; }
    }
}
