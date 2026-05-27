// db.orders.aggregate([
//     {
//         $match:{customer:"Alice"}
//     }
// ])

// db.employees.aggregate([
//     {
//         $match:{salary:{$gt:100000}}
//     }
// ])

db.orders.aggregate([
  {
    $match: {
      _id: ObjectId("64e1c1010101010101010101"),
    },
  },
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "userDetails",
    },
  },
]);

db.products.aggregate([
  {
    $lookup: {
      from: "categories",
      localField: "categoryId",
      foreignField: "_id",
      as: "Joined",
    },
  },
  {
    $unwind: "$Joined",
  },
]);

{
  $replaceRoot: {
    newRoot: {
      $mergeObjects: ["$Joined", "$$ROOT"];
    }
  }
}
// db.products.aggregate([
//   {
//     $lookup: {
//       from: "categories",
//       localField: "categoryId",
//       foreignField: "_id",
//       as: "Joined",
//     },
//   },
//   {
//     $unwind: "$Joined",
//   },
//   {
//     $project:{
//       _id:0,
//       product:"$name",
//       category:"$Joined.name"
//     }
//   }
// ]);

// db.employees.aggregate([
//   {
//     $match: {
//       department: "Engineering",
//     },
//   },
//   {
//     $project: {
//       _id: 0,
//       name: 1,
//       department: 1,
//       salary: 1,
//     },
//   },
//   {
//     $sort: { salary: 1 },
//   },
//   {
//     $limit: 1,
//   },
// ]);

// db.orders.aggregate([
//   {
//     $project: {
//       customer: 1,
//       price: 1,
//       quantity: 1,
//       total: { $multiply: ["$price", "$quantity"] },
//     },
//   },
// ]);

db.orders.aggregate([
  {
    $match: { customer: "Alice" },
  },
]);

db.employees.aggregate([
  {
    $match: { department: "Engineering" },
  },
]);

db.employees.aggregate([
  {
    $match: { salary: { $gte: 100000 } },
  },
  {
    $project: {
      _id: 0,
      name: 1,
      salary: 1,
    },
  },
]);

db.orders.aggregate([
  {
    $limit: 3,
  },
  {
    $sort: { price: 1 },
  },
  {
    $project: {
      _id: 0,
      item: 1,
      price: 1,
    },
  },
]);

db.orders.aggregate([
  {
    $group: {
      _id: { $dateToString: { format: "%m", date: "$date" } },
      numberOfOrders: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      Month: "$_id",
      numberOfOrders: 1,
    },
  },
]);

db.products.find({
  $and: [{ price: { $gt: 50 } }, { stock: { $lt: 100 } }],
});
db.products.find({
  $or: [{ price: { $gt: 50 } }, { stock: { $lt: 100 } }],
});
db.products.find({
  price: { $gt: 50 },
  stock: { $lt: 100 },
});

db.orders.find({ tags: { $elemMatch: { $regex: /^a{n,}s$/ } } });

db.orders
  .limit(2)
  .sort({ price: 1 })
  .find({ customer: "David" }, { _id: 0, item: 1, price: 1, customer: 1 });
