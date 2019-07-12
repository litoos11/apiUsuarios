const getManager = require('typeorm').getManager,
      md5 = require('md5-nodejs'),
      UsuarioSchema = require('../entity/usuarioSchema');



const getUsuariosOld = async (req, res) => {

  //let usuarioModel = new Usuario();
  try {
    //let Usuario = new EntitySchema(UsuarioSchema);
    let usuarioRepository = getManager().getRepository(UsuarioSchema);
    let usuarios = await usuarioRepository.find();
    res.status(200).send({ usuarios });
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: err.message });
  }
}

const getUsuarios = async (req, res) => {
  try {
    /*let usuarios = await getManager()
                          .getRepository(UsuarioSchema)
                          .createQueryBuilder('usuario')
                          .getMany();*/

    let usuarios = await getManager()
      .getRepository(UsuarioSchema)
      .createQueryBuilder('usuario')
      //.select(['usuario.USERID','usuario.FIRSTNAME'])
      .select()
      //.disableEscaping()
      .getMany();

    res.status(200).send({ usuarios });
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: err.message });
  }
}

const saveUsuario = async (req, res) => {

  let request = req.body;
  //console.log(request);
  let passwordMd5 = await md5(request.password);

  try {
    let usuario = await getManager()
      .getRepository(UsuarioSchema)
      .createQueryBuilder()
      .insert()
      .into(UsuarioSchema)
      .values([
        {
          USERNAME: request.username,
          EMAIL: request.email,
          PASSWORD: passwordMd5,
          FIRSTNAME: request.firstname,
          LASTNAME: request.lastname,
          STATUS: 1,
          ROL: request.rol
        }
      ])
      .execute();

    res.status(200).send({ usuario });
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: err.message });
  }
}

const login = async (req, res) => {
  let request = req.body;
  let passwordMd5 = await md5(request.password);
  let usernameUpper = request.username.toUpperCase();
  try {

    let usuario = await getManager()
      .getRepository(UsuarioSchema)
      .createQueryBuilder('usuario')
      .select()
      .where('UPPER(usuario.USERNAME) = :userName', { userName: usernameUpper })
      .andWhere('usuario.PASSWORD = :password', { password: passwordMd5 })
      .getOne();    

    if(typeof usuario === 'undefined')
      throw new Error('El usuario o la contraseña son incorrectas, intente de nuevo... :-(');

    usuario.STATUS = usuario.STATUS.trim();
    
    if(usuario.STATUS != 1)
      throw new Error(`El usuario ${usuario.USERNAME} está inactivo, contacte a mesa de ayuda... :-(`);

    console.log(usuario.STATUS);
    res.status(200).send({ usuario });
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
}


module.exports = {
  getUsuarios,
  saveUsuario,
  login,
  getUsuariosOld
}