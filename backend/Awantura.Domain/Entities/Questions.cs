using Awantura.Domain.Enums;

namespace Awantura.Domain.Entities
{
    public class Questions
    {
        public Guid Id { get; set; }
        public Category Category { get; set; }
        public string QuestionText { get; set; }
        public string[] Answers { get; set; }
        public Answer CorrectAnswer { get; set; }
        public int PointsForCorrectAnswer { get; set; }
    }
}
