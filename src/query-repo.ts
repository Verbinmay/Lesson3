type DBVideo = {
  _id: string;
  title: string;
  authorId: string;
};

type DBAuthor = {
  _id: string;
  firstname: string;
  lastname: string;
};

type VideoOutputModel = {
  id: string;
  title: string;
  author: {
    id: string;
    name: string;
  };
};



const videoQueryRepo = {
  getVideos(): VideoOutputModel[] {
    const dbVideos: DBVideo[] = [];
    const dbAuthors: DBAuthor[] = [];
    return dbVideos.map((dbVideos) => {
      const author = dbAuthors.find((a) => a._id === dbVideos.authorId);
      return {
        id: dbVideos._id,
        title: dbVideos.title,
        author: {
          id: author!._id,
          name: author!.firstname + " " + author!.lastname,
        },
      };
    });
  },
 
};
