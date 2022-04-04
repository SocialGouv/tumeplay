const handleRedirection = user => {
  if (user.pending_module) {
    return {
      module_id: user?.pending_module?.id,
      module_title: user?.pending_module?.title,
      theme: {
        title: user?.pending_module?.theme_title,
        image: user?.pending_module?.theme_image,
        color: user?.pending_module?.theme_color,
      },
      questions: user?.pending_module_questions,
      homeScreen: true,
      clearModuleData: true,
      retry: false,
    };
  } else if (user?.next_module) {
    return {
      module_id: user?.next_module?.id,
      module_title: user?.next_module?.title,
      theme: {
        title: user?.next_module?.theme_title,
        image: user?.next_module?.theme_image,
        color: user?.next_module?.theme_color,
      },
      questions: user?.next_module_questions,
      homeScreen: true,
      clearModuleData: true,
      retry: false,
    };
  } else {
    return {
      module_id: user?.random_module?.id,
      module_title: user?.random_module?.title,
      questions: user?.random_module_questions,
      theme: {
        title: user?.random_module?.theme_title,
        image: user?.random_module?.theme_image,
        color: user.random_module?.theme_color,
      },
      homeScreen: true,
      clearModuleData: true,
      retry: false,
    };
  }
};

export default handleRedirection;
