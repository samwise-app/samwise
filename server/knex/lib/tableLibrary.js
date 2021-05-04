const core = {
  moduleName: 'core',
  user: {
    tableName: 'core_user',
    columns: {
      name: 'name',
      picture: 'picture',
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

const tableLibrary = {
  core,
  knowledge,
};

exports.tableLibrary = tableLibrary;
