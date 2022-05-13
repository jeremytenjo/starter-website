export default function handler(req, res) {
  try {
    res.status(200).json({ sucess: 'hello from the example api :)' })
  } catch (error: any) {
    res.status(500).json({ error: error.toString() })
  }
}
