// Recipe Data
const recipes = [
    {
        id: 1,
        title: "Classic Spaghetti Carbonara",
        time: 25,
        difficulty: "easy",
        description: "A creamy Italian pasta dish made with eggs, cheese, pancetta, and black pepper.",
        category: "pasta"
    },
    {
        id: 2,
        title: "Chicken Tikka Masala",
        time: 45,
        difficulty: "medium",
        description: "Tender chicken pieces in a creamy, spiced tomato sauce.",
        category: "curry"
    },
    {
        id: 3,
        title: "Homemade Croissants",
        time: 180,
        difficulty: "hard",
        description: "Buttery, flaky French pastries that require patience but deliver amazing results.",
        category: "baking"
    },
    {
        id: 4,
        title: "Greek Salad",
        time: 15,
        difficulty: "easy",
        description: "Fresh vegetables, feta cheese, and olives tossed in olive oil and herbs.",
        category: "salad"
    },
    {
        id: 5,
        title: "Beef Wellington",
        time: 120,
        difficulty: "hard",
        description: "Tender beef fillet coated with mushroom duxelles and wrapped in puff pastry.",
        category: "meat"
    },
    {
        id: 6,
        title: "Vegetable Stir Fry",
        time: 20,
        difficulty: "easy",
        description: "Colorful mixed vegetables cooked quickly in a savory sauce.",
        category: "vegetarian"
    },
    {
        id: 7,
        title: "Pad Thai",
        time: 30,
        difficulty: "medium",
        description: "Thai stir-fried rice noodles with shrimp, peanuts, and tangy tamarind sauce.",
        category: "noodles"
    },
    {
        id: 8,
        title: "Margherita Pizza",
        time: 60,
        difficulty: "medium",
        description: "Classic Italian pizza with fresh mozzarella, tomatoes, and basil.",
        category: "pizza"
    }
];

// Select Container
const recipeContainer = document.querySelector('#recipe-container');

// Create Single Recipe Card
const createRecipeCard = (recipe) => {
    return `
        <div class="recipe-card" data-id="${recipe.id}">
            <h3>${recipe.title}</h3>
            <div class="recipe-meta">
                <span>⏱️ ${recipe.time} min</span>
                <span class="difficulty ${recipe.difficulty}">
                    ${recipe.difficulty}
                </span>
            </div>
            <p>${recipe.description}</p>
        </div>
    `;
};

// Render Recipes
const renderRecipes = (recipesToRender) => {
    const recipeCardsHTML = recipesToRender
        .map(createRecipeCard)
        .join('');

    recipeContainer.innerHTML = recipeCardsHTML;
};





let currentFilter = "all";
let currentSort = "none";

const filterButtons = document.querySelectorAll("[data-filter]");
const sortButtons = document.querySelectorAll("[data-sort]");

const applyFilter = (recipes, filterType) => {
  switch (filterType) {
    case "easy":
      return recipes.filter(recipe => recipe.difficulty === "easy");
    case "medium":
      return recipes.filter(recipe => recipe.difficulty === "medium");
    case "hard":
      return recipes.filter(recipe => recipe.difficulty === "hard");
    case "quick":
      return recipes.filter(recipe => recipe.time < 30);
    default:
      return recipes;
  }
};

const applySort = (recipes, sortType) => {
  const recipesCopy = [...recipes];

  switch (sortType) {
    case "name":
      return recipesCopy.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    case "time":
      return recipesCopy.sort((a, b) =>
        a.time - b.time
      );
    default:
      return recipesCopy;
  }
};

const updateDisplay = () => {
  let updatedRecipes = applyFilter(recipes, currentFilter);
  updatedRecipes = applySort(updatedRecipes, currentSort);
  renderRecipes(updatedRecipes);
};

const updateActiveButtons = () => {

  filterButtons.forEach(btn => {
    btn.classList.remove("active");
    if (btn.dataset.filter === currentFilter) {
      btn.classList.add("active");
    }
  });

  sortButtons.forEach(btn => {
    btn.classList.remove("active");
    if (btn.dataset.sort === currentSort) {
      btn.classList.add("active");
    }
  });

};

filterButtons.forEach(button => {
  button.addEventListener("click", (e) => {
    currentFilter = e.target.dataset.filter;
    updateActiveButtons();
    updateDisplay();
  });
});

sortButtons.forEach(button => {
  button.addEventListener("click", (e) => {
    currentSort = e.target.dataset.sort;
    updateActiveButtons();
    updateDisplay();
  });
});

// IIFE MODULE
const RecipeApp = (() => {

    // =============================
    // DATA
    // =============================
    const recipes = [
        {
            id: 1,
            title: "Spaghetti Carbonara",
            description: "Classic creamy pasta.",
            ingredients: [
                "Spaghetti",
                "Eggs",
                "Cheese",
                "Pepper"
            ],
            steps: [
                "Boil water",
                "Cook pasta",
                {
                    text: "Prepare sauce",
                    substeps: [
                        "Beat eggs",
                        "Add cheese",
                        {
                            text: "Seasoning",
                            substeps: [
                                "Add pepper",
                                "Mix well"
                            ]
                        }
                    ]
                },
                "Combine and serve"
            ]
        }
    ];

    const recipeContainer = document.querySelector("#recipe-container");

    // =============================
    // RECURSIVE FUNCTION
    // =============================
    const renderSteps = (steps, level = 0) => {
        const listClass = level === 0 ? "steps-list" : "substeps-list";
        let html = `<ol class="${listClass}">`;

        steps.forEach(step => {
            if (typeof step === "string") {
                html += `<li>${step}</li>`;
            } else {
                html += `<li>${step.text}`;
                if (step.substeps) {
                    html += renderSteps(step.substeps, level + 1);
                }
                html += `</li>`;
            }
        });

        html += "</ol>";
        return html;
    };

    const createStepsHTML = (steps) => {
        if (!steps || steps.length === 0) {
            return "<p>No steps available</p>";
        }
        return renderSteps(steps);
    };

    // =============================
    // CREATE CARD
    // =============================
    const createRecipeCard = (recipe) => {
        return `
            <div class="recipe-card">
                <h3>${recipe.title}</h3>
                <p>${recipe.description}</p>

                <div class="card-actions">
                    <button class="toggle-btn" data-id="${recipe.id}" data-type="steps">
                        Show Steps
                    </button>
                    <button class="toggle-btn" data-id="${recipe.id}" data-type="ingredients">
                        Show Ingredients
                    </button>
                </div>

                <div class="ingredients-container" data-id="${recipe.id}">
                    <ul>
                        ${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}
                    </ul>
                </div>

                <div class="steps-container" data-id="${recipe.id}">
                    ${createStepsHTML(recipe.steps)}
                </div>
            </div>
        `;
    };

    const renderRecipes = () => {
        recipeContainer.innerHTML = recipes
            .map(recipe => createRecipeCard(recipe))
            .join("");
    };

    // =============================
    // EVENT DELEGATION
    // =============================
    const handleToggleClick = (e) => {
        if (!e.target.classList.contains("toggle-btn")) return;

        const id = e.target.dataset.id;
        const type = e.target.dataset.type;

        const container = document.querySelector(
            `.${type}-container[data-id="${id}"]`
        );

        container.classList.toggle("visible");

        const isVisible = container.classList.contains("visible");
        e.target.textContent = isVisible
            ? `Hide ${type.charAt(0).toUpperCase() + type.slice(1)}`
            : `Show ${type.charAt(0).toUpperCase() + type.slice(1)}`;
    };

    const init = () => {
        renderRecipes();
        recipeContainer.addEventListener("click", handleToggleClick);
        console.log("RecipeApp initialized");
    };

    return {
        init
    };

})();

// START APP
RecipeApp.init();

renderRecipes(recipes);

updateDisplay();