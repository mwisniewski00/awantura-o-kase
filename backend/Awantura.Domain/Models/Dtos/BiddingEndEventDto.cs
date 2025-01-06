namespace Awantura.Domain.Models.Dtos
{
    public class BiddingEndEventDto
    {
        public required string QuestionText { get; set; }
        public required List<string> Answers { get; set; }
    }
}