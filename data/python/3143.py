from kivy.uix.popup import Popup
from kivy.uix.label import Label

def showMessageBox(Titulo,Mensaje):
    popup = Popup(title=Titulo, content=Label(text=Mensaje),auto_dismiss=True,size_hint=(None, None), size=(400, 200))
    popup.open()

def salvarLista(nommbrearchivo,lista): 
    try:
        archivo = open(nommbrearchivo, "wt") 
        for l in lista:
            archivo.write("{0}\n".format(l))
        archivo.close()
        showMessageBox("Exportar Lista","Archivo Exportado con Exito")
    except:
        showMessageBox("Exportar Lista","Error al Guardar Archivo")
