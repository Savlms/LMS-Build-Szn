const web3 = {
    id: 4,
    displayImage:
        "/Images/studentdashboard/ai-site-helping-with-software-production 1.png",
    enrolledUsers: [],
    modules: [
        {
            moduleId: 1,
            name: "Introduction to Blockchain",
            duration: "6:00",
            status: "Continue",
            videos: "https://youtu.be/SSo_EIwHSd4?si=T4D28YvtPk3PJT_c",
            content:
                "Fundamentals: Learn the basics of blockchain technology, including its decentralized nature, cryptographic principles, and consensus mechanisms. Smart Contracts: Explore smart contract development using languages like Solidity, focusing on creating self-executing contracts for various applications. Blockchain Platforms: Study different blockchain platforms like Ethereum, Hyperledger, and Corda, understanding their architectures and use cases. Security and Privacy: Delve into blockchain security best practices, including encryption, authentication, and permissioning, while also addressing privacy concerns. Real-world Applications: Analyze real-world blockchain implementations across industries such as finance, supply chain, healthcare, and voting systems, identifying opportunities and challenges.",

            quizzes: [
                {
                    title: "Introduction Quiz",
                    fileUrl: "https://example.com/quizzes/intro-quiz.pdf",
                },
            ],
        },
        {
            moduleId: 2,
            name: "Introduction to Ethereum Blockchain",
            duration: "3:09",
            status: "Locked",
            videos: "https://youtu.be/IsXvoYeJxKA?si=jjg668nmkTE7DYrW",
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
            name: "Introduction to Cryptography",
            duration: "8:09",
            status: "Locked",
            videos: "/https://youtu.be/Kf9KjCKmDcU?si=0qEL6kF3_6fZk2Oh",
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
            name: "Solidity",
            duration: "7.34",
            status: "Locked",
            videos: "https://youtu.be/kdvVwGrV7ec?si=talN0M8rXvYI5-vs",
            content:
                "",

            quizzes: [
                {
                    title: "User Testing Quiz",
                    fileUrl: "https://example.com/quizzes/user-testing-quiz.pdf",
                },
            ],
        },
    ]
}

export default web3;