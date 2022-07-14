type GetDataProps = { stubs: any; getFn: any; forceProdEnv?: boolean }

export default async function getData({ stubs, getFn }: GetDataProps) {
  const dataSourceIsDev = process.env.DATA_SOURCE === 'dev'
  const data = dataSourceIsDev ? stubs : await getFn()

  return data
}
