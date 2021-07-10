const core = {
  moduleName: 'core',
  user: {
    tableName: 'core_user',
    columns: {
      name: 'name',
      displayName: 'displayName',
      picture_url: 'picture_url',
      email: 'email',
      password: 'password',
      active_book: 'active_book',
    },
  },
  role: {
    tableName: 'core_role',
    columns: {
      name: 'name',
    },
  },
  role_user: {
    tableName: 'core_junc__role_user',
  },
};

const dictionary = {
  moduleName: 'dictionary',
  unit: {
    tableName: 'units',
    columns: {
      name: 'name',
    },
  },
};

const knowledge = {
  moduleName: 'knowledge',
  books: {
    subModuleName: 'knowledge_books',
    book: {
      tableName: 'knowledge_books_book',
      columns: {
        title: 'title',
        isbn_10: 'isbn_10',
        isbn_13: 'isbn_13',
        image: 'image',
        description: 'description',
        has_been_read: 'has_been_read',
        notes: 'notes',
        vector: 'vector',
      },
    },
    author: {
      tableName: 'knowledge_books_author',
      columns: {
        first_name: 'first_name',
        middle_name: 'middle_name',
        last_name: 'last_name',
        full_name: 'full_name',
      },
    },
    book_author: {
      tableName: 'knowledge_books_junc__book_author',
      columns: {
        knowledge_books_book_id: 'knowledge_books_book_id',
        knowledge_books_author_id: 'knowledge_books_author_id',
      },
    },
  },
};

const meal = {
  moduleName: 'meal',
  recipe: {
    tableName: 'meal_recipe',
    columns: {
      name: 'name',
      description: 'description',
      recipe_url: 'recipe_url',
      image_url: 'image_url',
      serving_size: 'serving_size',
      calories_per_serving: 'calories_per_serving',
      steps: 'steps',
      average_cost: 'average_cost',
      complexity: 'complexity',
      hours_required: 'hours_required',
      minutes_required: 'minutes_required',
      multiple_days: 'multiple_days',
      preferred_cook: 'preferred_cook',
      dinnerable: 'dinerrable',
      lunchable: 'lunchable',
      breakfastable: 'breakfastable',
      snackable: 'snackable',
      drinkable: 'drinkable',
    },
  },
  ingredient: {
    tableName: 'meal_ingredient',
    columns: {
      name: 'name',
      calories: 'calories',
      protein: 'protein',
      carbs: 'carbs',
      fat:'fat',
      
    },
  },
  ingredient_recipe: {
    tableName: 'meal_junc__ingredients_recipe',
    columns: {
      meal_recipe_id: 'meal_recipe_id',
      meal_ingredient_id: 'meal_ingredient_id',
      unit_id: 'unit_id',
      amount: 'amount',
    },
  },
};

const fitness = {
  moduleName: 'fitness',
  exercise: {
    tableName: 'fitness_exercise',
    columns: {
      name: 'name',
      sets: 'sets',
      reps: 'reps',
      description: 'description',
      video_url: 'video_url',
    },
  },
  workout: {
    tableName: 'workout',
    columns: {
      sunday: 'sunday',
      monday: 'monday',
      tuesday: 'tuesday',
      wednesday: 'wednesday',
      thursday: 'thursday',
      friday: 'friday',
      saturday: 'saturday',
    },
  },
};

const project = {
  moduleName: 'project',
  boards: {
    tableName: 'boards',
    columns: {
      name: 'name',
      background_image_url: 'background_image_url',
      ownerId: 'ownerId',
      test_please_delete: 'test_please_delete',
    },
  },
};

const tableLibrary = {
  core,
  knowledge,
  fitness,
  project,
  meal,
  dictionary,
};

exports.tableLibrary = tableLibrary;
