interface AddedImages {
  id: string;
  file: File;
}
const IMGWIDTH = 800;
async function resizeImage(images: AddedImages[]) {
  return Promise.all(
    images.map((currentImage) => {
      return new Promise((resolve) => {
        const filereader = new FileReader();

        filereader.readAsDataURL(currentImage.file);

        filereader.onloadend = (event) => {
          if (typeof event.target?.result === "string") {
            const image = new Image();
            image.src = event.target?.result;
            const canvas = document.createElement("canvas");
            canvas.width = IMGWIDTH;
            canvas.height = (IMGWIDTH / image.width) * image.height;

            const context = canvas.getContext("2d");
            context?.drawImage(image, 0, 0, canvas.width, canvas.height);
            canvas.toBlob((blob) => {
              if (blob !== null) {
                resolve(blob);
              }
            });
          }
        };
      });
    })
  );
}

//another function for same utility

// async function resizeImage(images: AddedImages[]) {
//     const promises: Promise<Blob | null>[] = [];

//     images.forEach((currentImage) => {
//       const filereader = new FileReader();

//       filereader.readAsDataURL(currentImage.file);

//       const promise = new Promise<Blob | null>((resolve) => {
//         filereader.onloadend = (event) => {
//           if (typeof event.target?.result === "string") {
//             const image = new Image();
//             image.src = event.target?.result;
//             const canvas = document.createElement("canvas");
//             canvas.width = IMGWIDTH;
//             canvas.height = (IMGWIDTH / image.width) * image.height;

//             const context = canvas.getContext("2d");
//             context?.drawImage(image, 0, 0, canvas.width, canvas.height);

//             canvas.toBlob((blob) => {
//               resolve(blob);
//             });
//           } else {
//             resolve(null); // Resolve with null if result is not a string
//           }
//         };
//       });

//       promises.push(promise);
//     });

//     // Wait for all promises to resolve
//     const blobs = await Promise.all(promises);

//     // Filter out null blobs and return the array of Blob objects
//     return blobs.filter((blob) => blob !== null) as Blob[];
//   }

export default resizeImage;
