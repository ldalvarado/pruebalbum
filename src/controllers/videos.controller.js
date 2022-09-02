const AWS = require('aws-sdk');
AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION || 'sa-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'AKIAXN7VWDWDSMAZHORG',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'uYIVZVUkbrUFPbZMnhC/pnzB38+6LRuBadzT1ikF',
});

const docClient = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.SAMPLE_TABLE || 'videos-api';


exports.findAll = async(req , res) => {
  /*if (event.httpMethod !== 'GET') {
    throw new Error(`getAllItems only accept GET method, you tried: ${httpMethod}`);
  }*/

  const params = { TableName: tableName };
  const { Items } = await docClient.scan(params).promise();

  const response = {
    statusCode: 200,
    body: Items,
  };

  res.json(response);
};

exports.putItems = async(req, res) => {
  const { id,description,src,title,url } = req.body;

  const params = {
      TableName: tableName,
      Item: { id,description,src,title,url },
  };
  await docClient.put(params).promise();

  const response = {
    statusCode: 200,
    message: 'VIDEO AGREGADO',
  };

  res.json(response);
};

exports.deleteItems = async(req, res) => {
  const { id,description,src,title } = req.body;

  const params = {
      TableName: tableName,
      Key: { id },
  };
  await docClient.delete(params).promise();

  const response = {
    statusCode: 200,
    message: 'VIDEO ELIMINADO',
  };

  res.json(response);
};