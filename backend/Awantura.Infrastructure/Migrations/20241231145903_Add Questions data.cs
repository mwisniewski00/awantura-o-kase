using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Awantura.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddQuestionsdata : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Questions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    QuestionText = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Answers = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CorrectAnswer = table.Column<int>(type: "int", nullable: false),
                    Category = table.Column<int>(type: "int", nullable: false),
                    PointsForCorrectAnswer = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questions", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Questions",
                columns: new[] { "Id", "Answers", "Category", "CorrectAnswer", "PointsForCorrectAnswer", "QuestionText" },
                values: new object[,]
                {
                    { new Guid("0068fa56-c1ab-4d57-96e5-96dc950057ba"), "Jerzy Antczak;Andrzej Wajda;Agnieszka Holland;Krzysztof Zanussi", 4, 0, 5, "Który polski reżyser stworzył film 'Noce i dnie'?" },
                    { new Guid("061b66f8-3cb2-43b2-8ec0-fde7bff8aec8"), "Fly fishing;Trolling;Spinning;Wędkarstwo gruntowe", 6, 0, 17, "Który rodzaj wędkowania wymaga sztucznej muchy?" },
                    { new Guid("0dfbfb31-83c9-44e8-bfdd-11f2562ae825"), "Niemcy;Brazylia;Argentyna;Francja", 5, 3, 20, "Która reprezentacja wygrała Mistrzostwa Świata w Piłce Nożnej w 2018 roku?" },
                    { new Guid("164b3c0a-7065-4501-9577-6432e169eb0d"), "Hel;Wodór;Azot;Tlen", 3, 1, 7, "Który pierwiastek ma symbol H?" },
                    { new Guid("1ab333f2-175d-4fe9-b287-45c7a13ba5c0"), "Kwas siarkowy;Kwas fosforowy;Kwas octowy;Kwas solny", 3, 2, 14, "Który kwas jest składnikiem octu?" },
                    { new Guid("1e9d83c4-28f2-4a5b-ace1-ea141b8ec7ea"), "Charles Michel;Ursula von der Leyen;Donald Tusk;Angela Merkel", 7, 0, 13, "Kto jest przewodniczącym Rady Europejskiej w 2024 roku?" },
                    { new Guid("2645075b-f485-4e1c-80f5-fdfafba0566c"), "Robert Lewandowski;Zbigniew Boniek;Grzegorz Lato;Kazimierz Deyna", 5, 0, 13, "Jak nazywa się polski piłkarz, który zdobył Złotą Piłkę?" },
                    { new Guid("2fc0da5b-e294-4af6-9471-e3065b681fac"), "Wielka Brytania;Francja;Niemcy;Włochy", 7, 0, 10, "Który kraj opuścił Unię Europejską w 2020 roku?" },
                    { new Guid("3068df39-02cd-4987-b3f0-72d60cd85df9"), "Morze Martwe;Morze Śródziemne;Morze Bałtyckie;Morze Kaspijskie", 0, 0, 12, "Które morze jest nazywane najbardziej zasolonym?" },
                    { new Guid("3d8af246-d5a9-4268-8413-10ab864e2ce6"), "Chlorek sodu;Wodorowęglan sodu;Siarczan sodu;Azotan sodu", 3, 0, 15, "Który związek chemiczny jest głównym składnikiem soli kuchennej?" },
                    { new Guid("4130f9ea-0aee-4b15-8d6c-394d9e0f5e91"), "Włókno węglowe;Drewno;Stal;Aluminium", 6, 0, 20, "Jakie jest najczęściej używane tworzywo do produkcji wędek?" },
                    { new Guid("4603ee74-570d-46b2-bb41-e003b0c2de86"), "Wenus;Jowisz;Mars;Syriusz", 1, 0, 5, "Jak nazywa się drugi pod względem jasności obiekt na nocnym niebie po Księżycu?" },
                    { new Guid("496b5864-aa3e-42ac-a237-ca7e7f01fc58"), "K2;Mont Blanc;Mount Everest;Kilimandżaro", 0, 2, 11, "Jak nazywa się najwyższy szczyt na Ziemi?" },
                    { new Guid("49e0f4e4-ecb9-4c7a-8ac2-50d35021fd10"), "Traktat Lizboński;Traktat z Maastricht;Traktat Rzymski;Traktat Amsterdamski", 7, 0, 15, "Który dokument jest podstawą prawną Unii Europejskiej?" },
                    { new Guid("4b3529f9-9ce7-4183-bc8e-41efe07825af"), "Metamorfoza;Adaptacja;Fotosynteza;Regeneracja", 2, 0, 10, "Jak nazywa się proces, w którym zwierzęta przechodzą zmiany w wyglądzie w czasie rozwoju?" },
                    { new Guid("4b814e1b-89c0-4f20-bbaa-0fe2acd7072d"), "Węgiel;Wapń;Cynk;Chrom", 3, 0, 17, "Który pierwiastek ma symbol C?" },
                    { new Guid("4f0efa39-8682-4c54-8e24-062da22ff42a"), "Saturn;Jowisz;Neptun;Uran", 1, 0, 6, "Która planeta jest znana z systemu pierścieni?" },
                    { new Guid("54bad5c9-c23c-4785-b26c-6a3729490067"), "Paryż;Berlin;Strasburg;Bruksela", 7, 3, 6, "Jak nazywa się główna siedziba Parlamentu Europejskiego?" },
                    { new Guid("5758a086-88ba-4aa4-9782-5cb632520eee"), "Kilimandżaro;Mount Kenya;Ruwenzori;Atlas", 0, 0, 13, "Jak nazywa się najwyższy szczyt Afryki?" },
                    { new Guid("5add4748-11dd-45c0-9899-0f24c88d6e42"), "Wątroba;Płuca;Mózg;Serce", 2, 3, 8, "Który organ w ludzkim ciele odpowiada za pompowanie krwi?" },
                    { new Guid("621b1012-b631-46ba-93b2-d992f31aaff2"), "Lech Wałęsa;Andrzej Duda;Aleksander Kwaśniewski;Donald Tusk", 7, 1, 16, "Kto jest prezydentem Polski w 2024 roku?" },
                    { new Guid("6512863f-85fd-4daf-b0ce-27295e37230a"), "Robert Lewandowski;Zbigniew Boniek;Grzegorz Lato;Kazimierz Deyna", 5, 0, 16, "Który polski piłkarz grał w Bayernie Monachium?" },
                    { new Guid("6777b191-5cd7-4fbf-96b6-eb089117996f"), "Niemcy;Czechy;Słowacja;Litwa", 0, 0, 10, "Który kraj graniczy z Polską na zachodzie?" },
                    { new Guid("69aa3302-369d-4cae-b1d1-5ef5fbd7c8f1"), "Eksplozja gwiazdy;Rodzaj galaktyki;Typ planety;Czarna dziura", 1, 0, 14, "Co to jest supernowa?" },
                    { new Guid("6f01740e-8dbf-4863-81a2-f8e134ea3867"), "Komórki;Tkanki;Narządy;Organizmy", 2, 0, 8, "Jakie są podstawowe jednostki budulcowe organizmów żywych?" },
                    { new Guid("7b82a06f-e607-45d4-80ff-6d1f4e3a8643"), "Woda;Tlenek wodoru;Para wodna;Sól", 3, 0, 6, "Co to jest H2O?" },
                    { new Guid("81499291-c646-4e41-93c9-afdb6471d035"), "Lew;Tygrys;Słoń;Goryl", 2, 0, 16, "Jakie zwierzę jest nazywane królem dżungli?" },
                    { new Guid("818698a6-596e-40ad-87e0-dfee10c3fd48"), "Wędkarstwo gruntowe;Metoda odległościowa;Trolling;Spinning", 6, 3, 16, "Jak nazywa się metoda połowu na sztuczną przynętę?" },
                    { new Guid("8746e07c-69dc-4131-b74c-a770795723ce"), "Merkury;Mars;Wenus;Pluton", 1, 0, 16, "Jak nazywa się najmniejsza planeta w Układzie Słonecznym?" },
                    { new Guid("87f0da7e-4d78-42c0-b918-99aabb1f8d3f"), "Płetwal błękitny;Słoń;Rekin wielorybi;Żyrafa", 2, 0, 14, "Jakie zwierzę jest największe na świecie?" },
                    { new Guid("8b0aac57-09bc-46dc-9f8d-77c56749befb"), "Ronaldo Nazário;Lionel Messi;Diego Maradona;Cristiano Ronaldo", 5, 0, 9, "Który piłkarz jest znany jako 'El Fenomeno'?" },
                    { new Guid("8ba65ad7-0bb9-4ddd-9076-049b7018fb5f"), "Olaf Lubaszenko;Bogusław Linda;Zbigniew Cybulski;Jan Nowicki", 4, 0, 9, "Który polski aktor grał w filmie 'Krótki film o miłości'?" },
                    { new Guid("8d7c6f75-a5a2-4c8b-b340-dff472e0a7c5"), "Botanika;Zoologia;Ekologia;Genetyka", 2, 0, 7, "Jak nazywa się nauka o roślinach?" },
                    { new Guid("908917e6-a421-4993-b532-66a0b38cb439"), "Powietrze;Woda z piaskiem;Olej i woda;Puder do twarzy", 3, 0, 20, "Która mieszanina jest jednorodna?" },
                    { new Guid("941fa5ca-34e9-4a2f-9cc6-36d51d0847f0"), "Wenus;Merkury;Mars;Ziemia", 1, 1, 10, "Która planeta jest najbliżej Słońca?" },
                    { new Guid("9a14f569-3df1-4a99-ae0c-05d5eb145568"), "Karp;Dorsz;Halibut;Łosoś", 6, 0, 13, "Który gatunek ryb jest typowo uznawany za rybę słodkowodną?" },
                    { new Guid("9bf55960-1c22-4f34-96bf-87d02b5ee631"), "Konstytucja 3 maja;Konstytucja kwietniowa;Konstytucja marcowa;Konstytucja sierpniowa", 7, 0, 10, "Jak nazywa się polska konstytucja z 1791 roku?" },
                    { new Guid("9bf78086-cef9-4c6e-8c37-5faf774ded9a"), "Waga wędkarska;Podbierak;Wędka;Kołowrotek", 6, 0, 16, "Jak nazywa się przyrząd do ważenia złowionych ryb?" },
                    { new Guid("9ceba7f5-890d-4538-a838-acf6d13365ac"), "Człowiek z żelaza;Dekalog;Ida;Pokot", 4, 0, 20, "Który film polskiego reżysera zdobył Złotą Palmę w Cannes?" },
                    { new Guid("9f4f71bd-bbcd-4f74-a32a-6491fea718bd"), "Księżyc;Mars;Wenus;Merkury", 1, 0, 13, "Jak nazywa się najbliższy Ziemi obiekt astronomiczny?" },
                    { new Guid("a32f8408-f2d8-440b-aadc-3e9cd56908f1"), "Adam Nawałka;Jerzy Brzęczek;Paulo Sousa;Franciszek Smuda", 5, 0, 20, "Kto był trenerem reprezentacji Polski w piłce nożnej na Euro 2016?" },
                    { new Guid("a3ad6a35-3e4c-4d7b-a3fb-d7c1a8110f97"), "Krzem;Cynk;Srebro;Węgiel", 3, 3, 17, "Który pierwiastek jest podstawowym składnikiem diamentu?" },
                    { new Guid("a8162970-74c5-4c92-a4ab-f159a0573512"), "Wędkarstwo gruntowe;Spinning;Trolling;Fly fishing", 6, 0, 14, "Jak nazywa się metoda łowienia ryb z brzegu?" },
                    { new Guid("a8388b5a-322f-4f82-a941-3adc5ff42664"), "Tatry;Sudety;Karpaty;Bieszczady", 0, 0, 10, "Które pasmo górskie znajduje się na południu Polski?" },
                    { new Guid("a9686176-a9da-4407-a5b2-d87a49c377e1"), "Jerzy Radziwiłowicz;Zbigniew Cybulski;Daniel Olbrychski;Andrzej Seweryn", 4, 0, 20, "Kto zagrał główną rolę w filmie 'Człowiek z żelaza'?" },
                    { new Guid("aba08d72-fc18-422b-b905-542680bb34a9"), "Lionel Messi;Cristiano Ronaldo;Johan Cruyff;Michel Platini", 5, 0, 13, "Kto jest rekordzistą pod względem liczby zdobytych Złotych Piłek?" },
                    { new Guid("ad1372d0-1799-4a8b-a1a7-a52982a980b8"), "Karaś;Leszcz;Pstrąg;Karp", 6, 2, 15, "Która ryba jest typowym drapieżnikiem?" },
                    { new Guid("b203decb-a821-4739-a095-9a4b89f378ca"), "Au;Ag;Fe;Cu", 3, 0, 14, "Jak nazywa się symbol chemiczny dla złota?" },
                    { new Guid("b4af2ab9-9d2e-464a-83ea-cd846b16fed6"), "Droga Mleczna;Andromeda;Karłowata Galaktyka Strzelca;Wielka Mgławica", 1, 0, 10, "Jak nazywa się galaktyka, w której znajduje się Ziemia?" },
                    { new Guid("b7265ea1-e953-455f-a7ca-d462f12f6607"), "Mateusz Morawiecki;Donald Tusk;Jarosław Kaczyński;Beata Szydło", 7, 0, 14, "Jak nazywa się premier Polski w 2024 roku?" },
                    { new Guid("b94d69d2-57b0-494f-ac92-1c045b1fdece"), "Marek Piwowski;Andrzej Wajda;Roman Polański;Krzysztof Kieślowski", 4, 0, 14, "Kto jest reżyserem filmu 'Rejs'?" },
                    { new Guid("b9556a01-0995-477b-aba8-fde3817a64ff"), "Andrzej Wajda;Agnieszka Holland;Krzysztof Kieślowski;Jerzy Hoffman", 4, 2, 12, "Kto jest twórcą trylogii filmowej 'Dekalog'?" },
                    { new Guid("bc04d412-0503-486f-84ae-f6078bc32dea"), "Saturn;Uran;Neptun;Jowisz", 1, 3, 5, "Która planeta w Układzie Słonecznym jest największa?" },
                    { new Guid("bddc9a14-160e-4d5b-81f4-40a2bec33baa"), "Warszawa;Kraków;Wrocław;Gdańsk", 0, 0, 11, "Które miasto jest stolicą Polski?" },
                    { new Guid("c1add7e4-6aef-4973-82e8-70fa7723d9f5"), "FC Barcelona;Real Madryt;AC Milan;Bayern Monachium", 5, 1, 17, "Który klub piłkarski wygrał najwięcej Lig Mistrzów?" },
                    { new Guid("c2ed00cb-bf2d-444a-9c68-c73a069635e9"), "Tlen;Wodór;Azot;Hel", 3, 0, 10, "Który pierwiastek ma symbol O?" },
                    { new Guid("c76f55a5-10ec-47fc-819c-1e5db6f065f3"), "Brazylia;Niemcy;Włochy;Argentyna", 5, 0, 8, "Która drużyna zdobyła najwięcej tytułów Mistrza Świata w piłce nożnej?" },
                    { new Guid("c9ced94a-ddea-4fe5-be5f-c339b5e64006"), "Oddychanie komórkowe;Fermentacja;Fotosynteza;Glukoneogeneza", 2, 2, 15, "Jak nazywa się proces, w którym rośliny przekształcają światło słoneczne w energię?" },
                    { new Guid("cb75dc26-5386-4251-930c-2d2315aca70f"), "Śniardwy;Mamry;Hańcza;Niegocin", 0, 0, 14, "Jakie jest największe jezioro w Polsce?" },
                    { new Guid("cf6dfdbd-f3d4-4ac4-9e85-d03270d48372"), "Słuch;Wzrok;Dotyk;Smak", 2, 0, 20, "Który zmysł odpowiada za wykrywanie dźwięków?" },
                    { new Guid("d0a6c34f-d246-48bb-80c6-c34b29524a7c"), "Adrien Brody;Roman Polański;Janusz Gajos;Bogusław Linda", 4, 0, 13, "Który polski aktor zdobył Oscara za rolę w filmie 'Pianista'?" },
                    { new Guid("d3385bb2-7ab8-4753-b5db-16c927660ecf"), "Chiny;Indie;Stany Zjednoczone;Rosja", 7, 2, 5, "Które państwo posiada najwięcej miejsc w ONZ?" },
                    { new Guid("d6ed2e6d-d205-4a48-819c-2e91883f4ecb"), "Andrzej Wajda;Roman Polański;Krzysztof Kieślowski;Agnieszka Holland", 4, 0, 13, "Kto jest reżyserem filmu 'Człowiek z marmuru'?" },
                    { new Guid("deeea496-fb0f-4182-add7-5b93c55cea25"), "Cicha noc;Ida;Katyń;Pan Tadeusz", 4, 1, 16, "Który polski film zdobył Oscara?" },
                    { new Guid("e34e41dd-7ea9-42e9-98b3-de964d7e59e4"), "Jowisz;Saturn;Mars;Uran", 1, 0, 6, "Która planeta Układu Słonecznego ma największą liczbę księżyców?" },
                    { new Guid("e5d314e8-2107-4df2-af51-f0f497fc94bc"), "Kołowrotek;Wędzisko;Haczyk;Podbierak", 6, 0, 17, "Jak nazywa się urządzenie do nawijania żyłki?" },
                    { new Guid("e6a4b266-f710-4623-aabe-3955184d750f"), "Berlin;Monachium;Frankfurt;Hamburg", 0, 0, 14, "Jakie miasto jest stolicą Niemiec?" },
                    { new Guid("efc22779-45e4-464f-99f3-50d55fd7b910"), "Sejm;Senat;Trybunał Konstytucyjny;Rada Ministrów", 7, 0, 20, "Jak nazywa się główny organ ustawodawczy w Polsce?" },
                    { new Guid("efffffeb-5182-49ec-bf9d-793e615443af"), "Ryba ciągnie przynętę;Ryba pływa obok;Wędka jest zanurzona;Przynęta jest zmieniana", 6, 0, 10, "Co oznacza termin 'brać' w wędkarstwie?" },
                    { new Guid("f2d5a14e-f9b6-456b-a595-a0eadeb8aa85"), "PGE Narodowy;Stadion Śląski;Stadion Legii;Arena Gdańsk", 5, 0, 10, "Jak nazywa się stadion narodowy w Polsce?" },
                    { new Guid("f3f2bf6b-43c6-481e-943a-64577f88a04f"), "Gepard;Antylopa;Lew;Królik", 2, 0, 10, "Które zwierzę jest najszybsze na lądzie?" },
                    { new Guid("f7e5939c-32f0-4f5b-85ce-6bfc77ff87f7"), "Europa;Azja;Afryka;Ameryka Południowa", 0, 1, 12, "Który kontynent jest największy pod względem powierzchni?" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Questions");
        }
    }
}
