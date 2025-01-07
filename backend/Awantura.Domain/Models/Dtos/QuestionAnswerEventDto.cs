using Awantura.Domain.Enums;

namespace Awantura.Domain.Models.Dtos
{
    public class QuestionAnswerEventDto
    {
        public int NewPool { get; set; }
        public Guid AnsweringPlayerId { get; set; }
        public int NewAccountBalance { get; set; }
        public bool IsAnswerCorrect { get; set; }
        public Category NewQuestionCategory { get; set; }

    }
}