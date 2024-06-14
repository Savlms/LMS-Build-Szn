const backend = {
    id: 3,
    displayImage:
        "/Images/studentdashboard/How Web 3_0 will Impact Businesses_ 2.png",
    enrolledUsers: [],
    modules: [
        {
            moduleId: 1,
            name: "Introduction to Programming",
            duration: "3.18",
            status: "Continue",
            videos: "https://youtu.be/NArVyt8t-z4?si=aQGZIm8HwMtXNoZj",
            content:
                "Foundations: Learn basic programming concepts like variables, data types, control structures, and functions. Language Proficiency: Master a programming language(s) with a focus on syntax, semantics, and coding best practices. Problem-Solving: Develop skills in analyzing problems, designing efficient solutions, and implementing them using code. Software Development Practices: Understand methodologies like Agile, version control with Git, and writing clean, maintainable code. Project-Based Learning: Apply knowledge to real-world projects, working in teams and following the software development lifecycle.",
            quizzes: [
                {
                    title: "Introduction Quiz",
                    fileUrl: "https://example.com/quizzes/intro-quiz.pdf",
                },
            ],
        },
        {
            moduleId: 2,
            name: "Git and Version Control",
            duration: "9.36",
            status: "Locked",
            videos: "https://youtu.be/9GKpbI1siow?si=99Jl7Ocp-zj0RxAS",
            content:
                "",
            quizzes: [
                {
                    title: "User Research Quiz",
                    fileUrl: "https://example.com/quizzes/user-research-quiz.pdf",
                },
            ],
        },
        {
            moduleId: 3,
            name: "Javascript Fundamentals",
            duration: "8:09",
            status: "Locked",
            videos: "https://youtu.be/fGdd9qNwQdQ?si=Aht4Wb1UmYbM5VHJ",
            content:
                "",
            quizzes: [
                {
                    title: "Prototyping Quiz",
                    fileUrl: "https://example.com/quizzes/prototyping-quiz.pdf",
                },
            ],
        },
        {
            moduleId: 4,
            name: "Object Oriented Programming",
            duration: "7.34",
            status: "Locked",
            videos: "https://youtu.be/pTB0EiLXUC8?si=r0cSXez_tuaavodG",
            content:
                "",
            quizzes: [
                {
                    title: "User Testing Quiz",
                    fileUrl: "https://example.com/quizzes/user-testing-quiz.pdf",
                }
            ]
        }
    ]
}

export default backend;