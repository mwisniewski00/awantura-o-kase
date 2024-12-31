using Awantura.Domain.Entities;
using Awantura.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.Text;

namespace Awantura.Infrastructure.Data
{
    public static class QuestionSeeder
    {
        public static void SeedQuestions(ModelBuilder modelBuilder)
        {
            var questions = new List<Question>();

            string projectRootDirectory = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"..\..\..\..");
            projectRootDirectory = Path.GetFullPath(projectRootDirectory);
            string filePath = Path.Combine(projectRootDirectory, "Awantura.Infrastructure", "Data", "questions.csv");
            var random = new Random();

            using (var reader = new StreamReader(filePath, Encoding.UTF8))
            {
                while (!reader.EndOfStream)
                {
                    var line = reader.ReadLine();
                    if (string.IsNullOrWhiteSpace(line)) 
                        continue;
                    var values = line.Split(";");
                    var question = new Question
                    {
                        Id = Guid.NewGuid(),
                        QuestionText = values[0],
                        Answers = string.Join(";", values[1], values[2], values[3], values[4]), //not an array to keep Polish characters
                        CorrectAnswer = int.Parse(values[5]),
                        Category = ParseCategory(values[6]),
                        PointsForCorrectAnswer = random.Next(5, 21)
                    };

                    questions.Add(question);
                }
            }

            modelBuilder.Entity<Question>().HasData(questions);
        }

        private static Category ParseCategory(string categoryDescription)
        {
            foreach (Category category in Enum.GetValues(typeof(Category)))
            {
                var description = category
                    .GetType()
                    .GetField(category.ToString())
                    .GetCustomAttributes(typeof(DescriptionAttribute), false);

                if (description.Length > 0 && ((DescriptionAttribute)description[0]).Description == categoryDescription)
                {
                    return category;
                }
            }

            throw new ArgumentException($"Unknown category: {categoryDescription}");
        }
    }
}
